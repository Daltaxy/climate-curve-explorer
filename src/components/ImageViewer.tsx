import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageViewerProps {
  images: string[];
  onRemoveImage: (index: number) => void;
}

export const ImageViewer = ({ images, onRemoveImage }: ImageViewerProps) => {
  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground text-lg">
          Select parameters and click "Add to Comparison" to view images
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-4">
      {images.map((image, index) => (
        <div key={`${image}-${index}`} className="relative group">
          <img
            src={image}
            alt={`Temperature curve ${index + 1}`}
            className="w-full h-auto border border-border rounded-lg shadow-lg"
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
      ))}
    </div>
  );
};
