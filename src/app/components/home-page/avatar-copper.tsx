// src/components/AvatarCropper.tsx
"use client";
import React, { useState, useRef } from "react";
import ReactCrop, {
  type Crop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface AvatarCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImageBlob: Blob) => void;
  onCancel: () => void;
}

// This function creates the cropped image from the source image and crop data
function getCroppedImg(image: HTMLImageElement, crop: Crop): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return Promise.reject(new Error("Canvas context is not available"));
  }

  const pixelRatio = window.devicePixelRatio;
  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = "high";

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
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      resolve(blob);
    }, "image/png");
  });
}

export default function AvatarCropper({
  imageSrc,
  onCropComplete,
  onCancel,
}: AvatarCropperProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop({ unit: "%", width: 90 }, 1, width, height),
      width,
      height
    );
    setCrop(crop);
  }

  const handleCrop = async () => {
    if (completedCrop && imgRef.current) {
      try {
        const croppedImageBlob = await getCroppedImg(
          imgRef.current,
          completedCrop
        );
        onCropComplete(croppedImageBlob);
      } catch (e) {
        console.error("Error cropping image:", e);
      }
    }
  };

  return (
    <div className="modal-background" style={{ zIndex: 500 }}>
      <div
        className="win-modal-container"
        style={{ minWidth: "300px", maxWidth: "90vw", maxHeight: "90vh" }}
      >
        <h2 className="win-modal-title">CROP YOUR AVATAR</h2>
        <div style={{ margin: "20px 0" }}>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1} // Enforce a 1:1 aspect ratio
            circularCrop // Make the crop selection circular
          >
            <img
              ref={imgRef}
              src={imageSrc}
              onLoad={onImageLoad}
              style={{ maxHeight: "60vh" }}
            />
          </ReactCrop>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <button
            onClick={onCancel}
            className="jsx-7a5051b5ea0cbf35 win-modal-button"
          >
            CANCEL
          </button>
          <button
            onClick={handleCrop}
            className="jsx-7a5051b5ea0cbf35 win-modal-button"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}
