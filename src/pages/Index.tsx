import { useState } from "react";
import { CreditCard, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UploadOption } from "@/components/UploadOption";
import { FileUploadZone } from "@/components/FileUploadZone";
import { useToast } from "@/hooks/use-toast";

type UploadMode = "single" | "double" | null;

const Index = () => {
  const [uploadMode, setUploadMode] = useState<UploadMode>(null);
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
      description: `Business card ${uploadMode === "double" ? "(both sides)" : "(front side)"} uploaded successfully.`,
    });

    // Reset form
    setUploadMode(null);
    setFrontFile(null);
    setBackFile(null);
  };

  const handleReset = () => {
    setUploadMode(null);
    setFrontFile(null);
    setBackFile(null);
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-subtle)]">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <ScanLine className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-[var(--gradient-primary)] bg-clip-text text-transparent">
            Business Card Upload
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Digitize your business cards with our professional upload system.
            Choose between single or double-sided scanning.
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {!uploadMode ? (
            /* Upload Mode Selection */
            <Card className="p-8 shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Select Upload Type
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <UploadOption
                  title="Single Side"
                  description="Upload only the front side of your business card"
                  icon={CreditCard}
                  selected={false}
                  onClick={() => setUploadMode("single")}
                />
                <UploadOption
                  title="Both Sides"
                  description="Upload both front and back sides of your business card"
                  icon={CreditCard}
                  selected={false}
                  onClick={() => setUploadMode("double")}
                />
              </div>
            </Card>
          ) : (
            /* File Upload Section */
            <Card className="p-8 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  {uploadMode === "single" ? "Upload Front Side" : "Upload Both Sides"}
                </h2>
                <Button variant="outline" onClick={handleReset}>
                  Change Mode
                </Button>
              </div>

              <div className="space-y-6">
                <FileUploadZone
                  label="Front Side *"
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

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-[var(--gradient-primary)] hover:opacity-90 transition-opacity"
                    size="lg"
                  >
                    Upload & Process
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    size="lg"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Your uploaded business cards are processed securely and stored with enterprise-grade encryption.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
