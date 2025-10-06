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
    <div className="space-y-3">
      <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 transition-all duration-500",
          "hover:border-primary/60 hover:bg-primary/5 hover:shadow-[var(--shadow-soft)]",
          isDragging ? "border-primary bg-primary/10 shadow-[var(--shadow-glow)] scale-[1.02]" : "border-border/60",
          preview ? "bg-muted/30" : "bg-background/30"
        )}
      >
        {preview ? (
          <div className="relative animate-in fade-in zoom-in duration-300">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-52 object-contain rounded-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-9 w-9 shadow-lg"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg py-2 px-3">
              <FileImage className="h-4 w-4 text-primary" />
              <span className="truncate max-w-[250px] font-medium">{file?.name}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-5 py-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 shadow-[var(--shadow-soft)]">
              <Upload className="w-10 h-10 text-primary" strokeWidth={2.5} />
            </div>
            <div className="text-center space-y-2">
              <p className="text-base font-medium">
                Drop your image here, or{" "}
                <label className="text-primary cursor-pointer hover:underline font-semibold">
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
                Supports: JPG, PNG, WEBP • Max 10MB
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
