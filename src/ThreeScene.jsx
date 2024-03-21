import { Canvas, useThree, extend, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { TextureLoader, DoubleSide, MeshPhysicalMaterial } from 'three';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import tshirtModel from './assets/only-tshirt.glb';
import mannequin from './assets/mannequin.glb';
import hoodie from './assets/hoodie.glb';
import jeans from './assets/jeans.glb';

import tshirtModel_L from './assets/L_size/only-tshirt.glb';
import mannequin_L from './assets/L_size/mannequin.glb';
import hoodie_L from './assets/L_size/hoodie.glb';
import jeans_L from './assets/L_size/jeans.glb';

import tshirtModel_S from './assets/S_size/only-tshirt.glb';
import mannequin_S from './assets/S_size/mannequin.glb';
import hoodie_S from './assets/S_size/hoodie.glb';
import jeans_S from './assets/S_size/jeans.glb';

// Extend the OrbitControls from three.js to use in react-three/fiber
extend({ OrbitControls: ThreeOrbitControls });

// OrbitControls component
const OrbitControls = (props) => {
    const { camera, gl: { domElement } } = useThree();
    const controls = useRef();

    useFrame(() => controls.current.update());

    return <orbitControls ref={controls} args={[camera, domElement]} minDistance={0.8} maxDistance={2} {...props} />;
};

// Model component
function Model({ url, position, rotation = [0, 0, 0], color = 'white', textureUrl, textureOffset = { x: 0, y: 0 }, textureRotation, imgScale, opacity = 0.5, scale = 1, HoT }) {
    const { scene } = useGLTF(url, true);
    let texture = null;
    // console.log(imgScale);

    if (textureUrl) {
        let offX;
        let offY;
        let Rot;
        HoT === 0 ? (offX = 0.31, offY = 0.1, Rot = -1) : (offX = 0.75, offY = 1.2, Rot = 2.14);
        texture = new TextureLoader().load(textureUrl);
        texture.offset.set(textureOffset.x + offX, textureOffset.y + offY);
        texture.rotation = textureRotation + Rot;
        texture.repeat.set(imgScale, imgScale);
    }

    scene.traverse((child) => {
        if (child.isMesh) {
            child.material = new MeshPhysicalMaterial({
                map: texture,
                color: color,
                reflectivity: 1,
                clearcoat: 1.0,
                side: DoubleSide,
                transparent: true,
                opacity: opacity,
            });
        }
    });

    useEffect(() => {
        if (texture) {
            texture.repeat.set(imgScale, imgScale);
        }
    });

    return <primitive object={scene} position={position} rotation={rotation} scale={scale} dispose={null} />;
}

// ThreeScene component
function ThreeScene({ color = 'white', textureUrl, textureOffset, textureRotation, imgScale, skinTex, manVis, HoT, textureScale, userSize, modRot }) {
    let selectedTshirtModel, selectedMannequin, selectedHoodie, selectedJeans;

    if(userSize === 'S') {
        selectedTshirtModel = tshirtModel_S;
        selectedMannequin = mannequin_S;
        selectedHoodie = hoodie_S;
        selectedJeans = jeans_S;
    } else if(userSize === 'L') {
        selectedTshirtModel = tshirtModel_L;
        selectedMannequin = mannequin_L;
        selectedHoodie = hoodie_L;
        selectedJeans = jeans_L;
    } else {
        selectedTshirtModel = tshirtModel;
        selectedMannequin = mannequin;
        selectedHoodie = hoodie;
        selectedJeans = jeans;
    }

    const inputModel = HoT === 0 ? selectedHoodie : selectedTshirtModel;
    console.log(modRot);
    return (
        <Canvas camera={{ position: [0, 0.3, 1.5] }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Model HoT={HoT} imgScale={textureScale} rotation={[0, modRot, 0]} url={inputModel} position={[0, 0, 0]} color={color} textureUrl={textureUrl} textureOffset={textureOffset} textureRotation={textureRotation} opacity={1} />
            <Model HoT={HoT} url={selectedMannequin} rotation={[0,modRot,0]} position={[0, 0, 0]} color={skinTex} scale={manVis} />
            <Model HoT={HoT} url={selectedJeans} rotation={[0,modRot,0]} position={[0,0,0]} color='darkblue' opacity={1} scale={manVis}/>
            <OrbitControls />
        </Canvas>
    );
}

export default ThreeScene;