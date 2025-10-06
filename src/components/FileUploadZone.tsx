import { useCallback, useState } from "react";
import { Upload, X, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadZoneProps {
  label: string;
  onFileSelect: (file: File | null) => void;
  file: File | null;
  accept?: string;
}

export const FileUploadZone = ({ 
  label, 
  onFileSelect, 
  file,
  accept = "image/*"
}: FileUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleRemove = useCallback(() => {
    onFileSelect(null);
    setPreview(null);
  }, [onFileSelect]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 transition-all duration-300",
          "hover:border-primary/50 hover:bg-primary/5",
          isDragging ? "border-primary bg-primary/10" : "border-border",
          preview ? "bg-muted/30" : "bg-background"
        )}
      >
        {preview ? (
          <div className="relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-48 object-contain rounded-md"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <FileImage className="h-4 w-4" />
              <span className="truncate max-w-[200px]">{file?.name}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-4 rounded-full bg-primary/10">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium mb-1">
                Drop your image here, or{" "}
                <label className="text-primary cursor-pointer hover:underline">
                  browse
                  <input
                    type="file"
                    className="hidden"
                    accept={accept}
                    onChange={handleFileInput}
                  />
                </label>
              </p>
              <p className="text-xs text-muted-foreground">
                Supports: JPG, PNG, WEBP (Max 10MB)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
