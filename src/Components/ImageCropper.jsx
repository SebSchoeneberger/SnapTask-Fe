import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

function ImageCropper({ imageSrc, onCropComplete }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropCompleteCallback = useCallback(
    (croppedArea, croppedAreaPixels) => {
      // console.log(croppedArea, croppedAreaPixels);
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCrop = useCallback(async () => {
    const croppedImageUrl = await getCroppedImage(imageSrc, croppedAreaPixels);
    const croppedFile = await urlToFile(croppedImageUrl, "cropped-image.jpg");
    onCropComplete(croppedImageUrl, croppedFile);
  }, [imageSrc, croppedAreaPixels, onCropComplete]);

  return (
    <div className=" md:left-[20%] md:w-2/3 w-4/5 top-[10%] left-8 flex flex-col items-center h-3/4  bg-base-300 fixed z-20  border-[1px] border-primary border-opacity-50 p-4 rounded-lg">
      <div className="relative mb-4 h-full w-full">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteCallback}
        />
      </div>
      <input
        type="range"
        min="1"
        max="3"
        step="0.1"
        value={zoom}
        onChange={(e) => setZoom(e.target.value)}
        className="range range-primary range-sm w-full max-w-lg"
      />
      <div className="flex space-x-4 mt-4">
        <button className="btn btn-primary rounded-2xl" onClick={handleCrop}>
          Confirm
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => onCropComplete(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

async function urlToFile(url, fileName) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
}

async function getCroppedImage(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      resolve(URL.createObjectURL(blob));
    }, "image/jpeg");
  });
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
  });
}

export default ImageCropper;
