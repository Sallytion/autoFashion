import { Canvas, useThree, extend, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import tshirtModel from './assets/only-tshirt.glb';
import mannequin from './assets/mannequin.glb';
import hoodie from './assets/hoodie.glb';
import { DoubleSide } from 'three';
import { MeshPhysicalMaterial, MeshStandardMaterial } from 'three';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useRef } from 'react';
import { TextureLoader } from 'three';
import { useEffect } from 'react';

extend({ OrbitControls: ThreeOrbitControls });

const OrbitControls = (props) => {
    const {
        camera,
        gl: { domElement },
    } = useThree();

    const controls = useRef();
    useFrame((state) => controls.current.update());

    return (
        <orbitControls
            ref={controls}
            args={[camera, domElement]}
            minDistance={0.8}
            maxDistance={2}
            {...props}
        />
    );
};

function ThreeScene({ color = 'white', textureUrl, textureOffset, textureRotation, imgScale, skinTex, manVis,HoT }) {
    let inputModel;
    HoT==1 ? inputModel=hoodie : inputModel=tshirtModel;
    return (
        <Canvas camera={{ position: [0,0.5,1]}}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Model url={inputModel} position={[0,-0.3,0]} color={color} textureUrl={textureUrl} textureOffset={textureOffset} textureRotation={textureRotation} imgScale={imgScale} opacity={1}/>
            <Model url={mannequin} position={[0,-0.3,0]} color={skinTex} opacity={manVis} scale={manVis}/>
            <OrbitControls />
        </Canvas>
    );
}

function Model({url, position, color = 'white', textureUrl, textureOffset = {x: 0, y: 0}, textureRotation = 1, imgScale = 1, opacity = 0.5, scale=1}){
    const gltf = useGLTF(url,true);
    const { scene } = gltf;
    let texture = null;

    if (textureUrl) {
        texture = new TextureLoader().load(textureUrl);

        // Set the texture offset
        texture.offset.set(textureOffset.x, textureOffset.y);

        // Set the texture rotation
        texture.rotation = textureRotation;

        // Set the texture scale
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
                transparent: true, // Enable transparency
                opacity: opacity
            });
        }
    });
    useEffect(()=>{
        if(texture){
            texture.repeat.set(imgScale, imgScale);
        }
    })
    return <primitive object={scene} position={position} scale={scale} dispose={null}/>;
}

export default ThreeScene;