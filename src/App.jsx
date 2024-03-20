import { useState, useEffect } from 'react';
import './App.css';
import ThreeScene from './ThreeScene';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function App() {
  const [color, setColor] = useState(localStorage.getItem('color') || '#ffffff');
  const [image, setImage] = useState(null);
  const [imgPos, setImgPos] = useState({x: 0, y: 0});
  const [imgScale, setImgScale] = useState(1);
  const [rotateImg, setImgRotation] =  useState(1);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [croppedImage, setCroppedImageUrl] = useState(null);
  const [skinHex, setSkinHex] = useState('#000000');
  const [mannequin, setMannequin] = useState(0);
  const [useTH, setUseTH] = useState(0);

  let imgRot = 0;

  const onImageLoaded = (image) => {
    this.imageRef = image;
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  }

  const onCropChange = (crop,percentCrop) => {
    setCrop(crop);
  }

  const makeClientCrop = async (crop) => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      setCroppedImageUrl(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        resolve(window.URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleImageUpload = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  }

  const handleRotation = (degree) => {
    const radian = degree * (Math.PI / 180); // Convert degree to radian
    setImgRotation(prevRotation => prevRotation + radian);
  }
  const handlePosition = (incrementX, incrementY) => {
    setImgPos(prevPos => ({x: prevPos.x + incrementX, y: prevPos.y + incrementY}));
  }
  const handleScale = (scaleChange) => {
    setImgScale(prevScale => {
      const newScale = prevScale + scaleChange;
      console.log(newScale);
      return newScale;
    });
  }

  const handleCrop = () => {
    setImage(croppedImageUrl);
  };

  // useEffect(() => {
  //   localStorage.setItem('color', color);
  // }, [color]);

  function handleSkinToneChange(event) {
    const hue = event.target.value;
    const saturation = 50;
    const lightness = 85;
  
    const newSkinHex = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    setSkinHex(newSkinHex); // Update the skinHex state variable
    console.log(newSkinHex);
  }

  function handleMannequin(event) {
    mannequin==0 ? setMannequin(1) : setMannequin(0);
  }

  function handleHoodie(event) {
    useTH==0 ? setUseTH(1) : setUseTH(0);
  }

  console.log(skinHex);

  return (
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
            <ReactCrop
            src={image}
            crop={crop}
            onImageLoaded={onImageLoaded}
            onComplete={onCropComplete}
            onChange={onCropChange}
            />
            <br />
            <img src={image} alt="Uploaded content" width="50%"/>
            <br />
            <div style={{ width: '50%', margin: 'auto' }}>
              <button style={{ padding: '10px', margin: '5px' }} onClick={() => handleRotation(5)}>Rotate Texture</button>
              <button style={{ padding: '10px', margin: '5px' }} onClick={() => handlePosition(0.1, 0)}>Position X++</button>
              <button style={{ padding: '10px', margin: '5px' }} onClick={() => handlePosition(0, 0.1)}>Position Y++</button>
              <button style={{ padding: '10px', margin: '5px' }} onClick={() => handlePosition(-0.1, 0)}>Position X--</button>
              <button style={{ padding: '10px', margin: '5px' }} onClick={() => handlePosition(0, -0.1)}>Position Y--</button>
              <button style={{ padding: '10px', margin: '5px' }} onClick={() => handleScale(0.01)}>Scale++</button>
              <button style={{ padding: '10px', margin: '5px' }} onClick={() => handleScale(-0.01)}>Scale--</button>
              <button stype={{ padding: '10px', margin: '5px' }} onClick={() => handleCrop()}>Crop Image</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;