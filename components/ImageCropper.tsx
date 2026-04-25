"use client";

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, Check, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedImage: Blob) => void;
  onCancel: () => void;
  aspect?: number;
}

export default function ImageCropper({ image, onCropComplete, onCancel, aspect = 1 }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropChange = (crop: any) => setCrop(crop);
  const onZoomChange = (zoom: number) => setZoom(zoom);

  const onCropCompleteInternal = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedImage = async () => {
    try {
      const canvas = document.createElement('canvas');
      const img = new Image();
      img.src = image;
      await new Promise((resolve) => (img.onload = resolve));

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      canvas.toBlob((blob) => {
        if (blob) onCropComplete(blob);
      }, 'image/jpeg', 0.9);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-xl">
      <div className="flex justify-between items-center p-6 text-white border-b border-white/10">
        <div>
          <h3 className="text-xl font-black tracking-tight">Adjust Profile Photo</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Center the face correctly</p>
        </div>
        <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="relative flex-1 bg-slate-900 overflow-hidden">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspect}
          onCropChange={onCropChange}
          onCropComplete={onCropCompleteInternal}
          onZoomChange={onZoomChange}
          classes={{
            containerClassName: "bg-slate-900",
            mediaClassName: "max-h-full",
            cropAreaClassName: "border-2 border-academic-gold shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]"
          }}
        />
      </div>

      <div className="p-8 bg-white rounded-t-[3rem] space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 w-full space-y-3">
            <div className="flex items-center justify-between">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zoom Level</span>
               <span className="text-[10px] font-black text-academic-navy bg-slate-100 px-2 py-0.5 rounded-full">{Math.round(zoom * 100)}%</span>
            </div>
            <div className="flex items-center gap-4">
              <ZoomOut size={18} className="text-slate-400" />
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-academic-gold"
              />
              <ZoomIn size={18} className="text-slate-400" />
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={() => setRotation((r) => r + 90)}
              className="flex-1 md:flex-none p-4 bg-slate-50 text-slate-600 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              <span className="md:hidden text-xs font-bold uppercase tracking-widest">Rotate</span>
            </button>
            <button
              onClick={createCroppedImage}
              className="flex-[2] md:flex-none px-12 py-4 bg-academic-navy text-white font-black rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-academic-navy/20 active:scale-95"
            >
              <Check size={20} />
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
