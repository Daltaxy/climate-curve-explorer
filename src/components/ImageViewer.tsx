import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageViewerProps {
  images: string[];
  onRemoveImage: (index: number) => void;
  layout: "horizontal" | "vertical" | "grid";
  onReorderImages: (newOrder: string[]) => void;
}

export const ImageViewer = ({ images, onRemoveImage, layout, onReorderImages }: ImageViewerProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground text-lg">
          Select parameters and click "Add to Comparison" to view images
        </p>
      </div>
    );
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null) return;
    
    const newImages = [...images];
    const [draggedImage] = newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);
    
    onReorderImages(newImages);
    setDraggedIndex(null);
  };

  const renderImage = (image: string, index: number) => (
    <div
      key={`${image}-${index}`}
      className="relative group cursor-move"
      draggable
      onDragStart={() => handleDragStart(index)}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(index)}
    >
      <img
        src={image}
        alt={`Temperature curve ${index + 1}`}
        className="w-full h-full object-contain border border-border rounded-lg shadow-lg"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            const errorDiv = document.createElement("div");
            errorDiv.className = "flex items-center justify-center h-64 bg-card border border-border rounded-lg";
            errorDiv.innerHTML = `<p class="text-muted-foreground">Image not found: ${image.split('/').pop()}</p>`;
            parent.appendChild(errorDiv);
          }
        }}
      />
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 opacity-80 group-hover:opacity-100 transition-opacity"
        onClick={() => onRemoveImage(index)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  const getLayoutClasses = () => {
    switch (layout) {
      case "horizontal":
        return "grid grid-rows-2 gap-4 h-full";
      case "vertical":
        return "grid grid-cols-2 gap-4 h-full";
      case "grid":
        return "grid grid-cols-2 grid-rows-2 gap-4 h-full";
      default:
        return "space-y-4 pb-4";
    }
  };

  if (layout === "horizontal" || layout === "vertical" || layout === "grid") {
    const maxImages = layout === "grid" ? 4 : 2;
    const displayImages = images.slice(0, maxImages);
    
    return (
      <div className={getLayoutClasses()}>
        {displayImages.map((image, index) => renderImage(image, index))}
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-4">
      {images.map((image, index) => renderImage(image, index))}
    </div>
  );
};
