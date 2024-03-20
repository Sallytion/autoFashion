import { Canvas, useThree, extend, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { TextureLoader, DoubleSide, MeshPhysicalMaterial } from 'three';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import tshirtModel from './assets/only-tshirt.glb';
import mannequin from './assets/mannequin.glb';
import hoodie from './assets/hoodie.glb';

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
function Model({ url, position, color = 'white', textureUrl, textureOffset = { x: 0, y: 0 }, textureRotation, imgScale = 1, opacity = 0.5, scale = 1, HoT }) {
    const { scene } = useGLTF(url, true);
    let texture = null;

    if (textureUrl) {
        let offX;
        let offY;
        let Rot;
        HoT === 0 ? (offX = 0.31, offY = 0.1, Rot = -1) : (offX = 0.75, offY = 1.2, Rot = 2.14);
        texture = new TextureLoader().load(textureUrl);
        texture.offset.set(textureOffset.x + offX, textureOffset.y + offY);
        texture.rotation = textureRotation + Rot;
        console.log(texture.rotation);
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

    return <primitive object={scene} position={position} scale={scale} dispose={null} />;
}

// ThreeScene component
function ThreeScene({ color = 'white', textureUrl, textureOffset, textureRotation, imgScale, skinTex, manVis, HoT }) {
    const inputModel = HoT === 0 ? hoodie : tshirtModel;

    return (
        <Canvas camera={{ position: [0, 0.5, 1] }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Model HoT={HoT} url={inputModel} position={[0, -0.3, 0]} color={color} textureUrl={textureUrl} textureOffset={textureOffset} textureRotation={textureRotation} imgScale={imgScale} opacity={1} />
            <Model HoT={HoT} url={mannequin} position={[0, -0.3, 0]} color={skinTex} opacity={manVis} scale={manVis} />
            <OrbitControls />
        </Canvas>
    );
}

export default ThreeScene;