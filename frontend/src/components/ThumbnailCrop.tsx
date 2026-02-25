import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";

interface Props {
  file: File;
  onDone: (file: File) => void;
  onCancel: () => void;
}

export default function ThumbnailCrop({ file, onDone, onCancel }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<any>(null);

  const image = URL.createObjectURL(file);

  const onComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setArea(croppedAreaPixels);
  }, []);

  async function createImage() {
    if (!area) {
      // jika user tidak crop, pakai file asli
      onDone(file);
      return;
    }

    const img = document.createElement("img");
    img.src = image;
    await new Promise((r) => (img.onload = r));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    canvas.width = area.width;
    canvas.height = area.height;

    ctx.drawImage(
      img,
      area.x,
      area.y,
      area.width,
      area.height,
      0,
      0,
      area.width,
      area.height
    );

    const blob: Blob = await new Promise((res) =>
      canvas.toBlob((b) => res(b!), "image/jpeg", 0.95)
    );

    const newFile = new File([blob], file.name, {
      type: "image/jpeg",
    });

    onDone(newFile); // Hanya update state di parent, tidak submit
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex flex-col">
      <div className="relative flex-1">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={16 / 9}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onComplete}
        />
      </div>

      <div className="p-4 bg-white flex gap-3">
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
        />

        <button onClick={onCancel}>Batal</button>
        <button type="button"
          onClick={createImage}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          Gunakan Thumbnail
        </button>
      </div>
    </div>
  );
}