import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

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
    
    if (layout === "grid") {
      return (
        <div className="h-full">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} minSize={20}>
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={20}>
                  <div className="h-full p-2">
                    {displayImages[0] && renderImage(displayImages[0], 0)}
                  </div>
                </ResizablePanel>
                {displayImages[1] && (
                  <>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={50} minSize={20}>
                      <div className="h-full p-2">
                        {renderImage(displayImages[1], 1)}
                      </div>
                    </ResizablePanel>
                  </>
                )}
              </ResizablePanelGroup>
            </ResizablePanel>
            {displayImages[2] && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50} minSize={20}>
                  <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={50} minSize={20}>
                      <div className="h-full p-2">
                        {renderImage(displayImages[2], 2)}
                      </div>
                    </ResizablePanel>
                    {displayImages[3] && (
                      <>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={50} minSize={20}>
                          <div className="h-full p-2">
                            {renderImage(displayImages[3], 3)}
                          </div>
                        </ResizablePanel>
                      </>
                    )}
                  </ResizablePanelGroup>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>
      );
    }
    
    return (
      <ResizablePanelGroup 
        direction={layout === "horizontal" ? "vertical" : "horizontal"}
        className="h-full"
      >
        <ResizablePanel defaultSize={50} minSize={20}>
          <div className="h-full p-2">
            {displayImages[0] && renderImage(displayImages[0], 0)}
          </div>
        </ResizablePanel>
        {displayImages[1] && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={20}>
              <div className="h-full p-2">
                {renderImage(displayImages[1], 1)}
              </div>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    );
  }

  return (
    <div className="space-y-4 pb-4">
      {images.map((image, index) => renderImage(image, index))}
    </div>
  );
};
