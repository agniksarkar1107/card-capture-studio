import { useState } from "react";
import { ScanLine, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUploadZone } from "@/components/FileUploadZone";
import { useToast } from "@/hooks/use-toast";
import logoUrl from "../../image.png";

type UploadMode = "single" | "double" | "multi" | "";

const Index = () => {
  const [uploadMode, setUploadMode] = useState<UploadMode>("");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!frontFile) {
      toast({
        title: "Missing Front Side",
        description: "Please upload the front side of your business card.",
        variant: "destructive",
      });
      return;
    }

    if (uploadMode === "double" && !backFile) {
      toast({
        title: "Missing Back Side",
        description: "Please upload the back side of your business card.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Upload Successful",
      description:
        uploadMode === "double"
          ? "Business card (both sides) uploaded successfully."
          : uploadMode === "multi"
          ? "Sheet with multiple front sides uploaded successfully."
          : "Business card (front side) uploaded successfully.",
    });

    // Reset form
    setUploadMode("");
    setFrontFile(null);
    setBackFile(null);
  };

  const handleReset = () => {
    setUploadMode("");
    setFrontFile(null);
    setBackFile(null);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-100 -z-10"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        {/* Top-left logo */}
        <img
          src={logoUrl}
          alt="Company Logo"
          className="absolute top-6 left-6 h-10 w-10 rounded-xl shadow-[var(--shadow-soft)] z-10"
        />
        {/* Header */}
        <header className="text-center mb-14 space-y-7 z-10 relative">
          <div className="inline-flex items-center justify-center p-5 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mb-5 shadow-[var(--shadow-glow)] backdrop-blur-sm">
            <ScanLine className="w-11 h-11 text-primary" strokeWidth={2.5} />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.6)]">
              Business Card Scanner
            </h1>
            <p className="text-base md:text-lg text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Capture and digitize cards with a premium, AI-powered experience.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 md:p-10 bg-[var(--gradient-card)] shadow-[var(--shadow-medium)] border-border/50 backdrop-blur-sm">
            <div className="space-y-8">
              {/* Upload Mode Selector */}
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Select Upload Type
                </label>
                <Select value={uploadMode} onValueChange={(value: UploadMode) => {
                  setUploadMode(value);
                  setFrontFile(null);
                  setBackFile(null);
                }}>
                  <SelectTrigger className="w-full h-14 text-base bg-background/50 border-2 hover:border-primary/50 transition-colors">
                    <SelectValue placeholder="Choose upload option..." />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-2">
                    <SelectItem value="single" className="text-base py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        <span className="font-medium">Front Side Only</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="double" className="text-base py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-medium">Both Sides (Front & Back)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="multi" className="text-base py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary/70"></div>
                        <span className="font-medium">Upload Multiple Pages (one image with multiple fronts)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Upload Zones - Show only when mode is selected */}
              {uploadMode && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {uploadMode === "double"
                        ? "Upload your card images"
                        : uploadMode === "multi"
                        ? "Upload a single image containing multiple front sides"
                        : "Upload your card image"}
                    </span>
                  </div>

                  <FileUploadZone
                    label={uploadMode === "multi" ? "Sheet with multiple fronts *" : "Front Side *"}
                    file={frontFile}
                    onFileSelect={setFrontFile}
                  />

                  {uploadMode === "double" && (
                    <FileUploadZone
                      label="Back Side *"
                      file={backFile}
                      onFileSelect={setBackFile}
                    />
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      onClick={handleSubmit}
                      className="flex-1 h-12 text-base font-semibold bg-[var(--gradient-hero)] hover:opacity-90 transition-all shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)]"
                      size="lg"
                    >
                      Process Card
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="h-12 border-2 hover:bg-muted/50"
                      size="lg"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              )}

              {/* Empty state when no mode selected */}
              {!uploadMode && (
                <div className="py-12 text-center space-y-3 text-muted-foreground animate-in fade-in duration-500">
                  <div className="text-6xl opacity-20">📇</div>
                  <p className="text-sm">Select an upload type above to get started</p>
                </div>
              )}
            </div>
          </Card>

          {/* Footer Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground/80">
              🔒 Your data is encrypted and processed securely with enterprise-grade protection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
