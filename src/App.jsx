import { useState } from 'react';
import './App.css';
import ThreeScene from './ThreeScene';
import React, {useEffect} from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Navmenu from './components/Navmenu';


function App() {
  const [color, setColor] = useState(localStorage.getItem('color') || '#ffffff');
  const [image, setImage] = useState(null);
  const [imgPos, setImgPos] = useState({x: 0, y: 0});
  const [imgScale, setImgScale] = useState(1);
  const [rotateImg, setImgRotation] =  useState(1);
  const [skinHex, setSkinHex] = useState('#000000');
  const [mannequin, setMannequin] = useState(false);
  const [useTH, setUseTH] = useState(false);
  const [images, setImages] = useState([]);

  const handleColorChange = (event) => setColor(event.target.value);
  const handleImageUpload = (event) => setImage(URL.createObjectURL(event.target.files[0]));
  const handleRotation = (degree) => setImgRotation(prevRotation => prevRotation + degree * (Math.PI / 180));
  const handlePosition = (incrementX, incrementY) => setImgPos(prevPos => ({x: prevPos.x + incrementX, y: prevPos.y + incrementY}));
  function handleScale  (scaleChange)  {setImgScale(imgScale + scaleChange)};
  const handleSkinToneChange = (event) => setSkinHex(`hsl(${event.target.value}, 50%, 85%)`);
  const handleMannequin = () => setMannequin(prevMannequin => !prevMannequin);
  function handleHoodie(){setUseTH(prevUseTH => prevUseTH === 0 ? 1 : 0);}

  // useEffect(() => {
  //   const fetchImages = async () => {
  //      const response = await axios.get('https://api.unsplash.com/photos/random?client_id=CLHz001lyqs-ojCEwJqzGO63uqr8ndGWGKJJk3Ff9Rk&count=4');
  //     setImages(response.data);
  //   };

  //   fetchImages();
  // }, []);

  return (
    <div>
      
      <Navbar />
    {/* <h1><span><a href='home.html'>Home</a>&nbsp; &nbsp;</span>Customize in your way</h1> */}
    <div className="container">
      <ThreeScene color={color} textureUrl={image} textureOffset={imgPos} textureScale={imgScale} textureRotation={rotateImg} skinTex={skinHex} manVis={mannequin} HoT={useTH}/>
      <div className="other-side element-with-border">
        <input type="color" value={color} onChange={handleColorChange} />
        <br />
        <input type="file" onChange={handleImageUpload}/>
        <br />
        <button stype={{ padding: '10px', margin: '5px' }} onClick={() => handleMannequin()}>add/remove Model</button>
        <button stype={{ padding: '10px', margin: '5px' }} onClick={() => handleHoodie()}>change to hoodie</button>
        <br />
        <input type="range" min="0" max="50" onChange={handleSkinToneChange} />
        <br/>
        {image && (
          <>
            <img src={image} alt="Uploaded content" width="50%"/>
            <br />
            <div style={{ width: '50%', margin: 'auto' }}>
              <button style={{ padding: '10px', margin: '5px' }} onClick={() => handlePosition(0.1, 0)}>Position X++</button>
              <button style={{ padding: '10px', margin: '5px' }} onClick={() => handlePosition(-0.1, 0)}>Position X--</button>
              <button style={{ padding: '10px', margin: '5px' }} onClick={() => handleRotation(5)}>Rotate Texture</button>
              <button style={{ padding: '10px', margin: '5px' }} onClick={() => handlePosition(0, 0.1)}>Position Y++</button>
              <button style={{ padding: '10px', margin: '5px' }} onClick={() => handlePosition(0, -0.1)}>Position Y--</button>
              <button style={{ padding: '10px', margin: '5px' }} onClick={() => handleScale(0.1)}>Scale++</button>
              {/* `{console.log(imgScale)}` */}
              <button style={{ padding: '10px', margin: '5px' }} onClick={() => handleScale(-0.1)}>Scale--</button>
            </div>
          </>
        )}
        {/* {images.map((image) => (
          <img 
            key={image.id} 
            src={image.urls.small} 
            alt={image.alt_description} 
            style={{ maxHeight: '20vh' }} 
            onClick={() => setImage(image.urls.small)}
          />
        ))} */}
      </div>
    </div>
    </div>
  );
}

export default App;