import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface UploadOptionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
}

export const UploadOption = ({ 
  title, 
  description, 
  icon: Icon, 
  selected, 
  onClick 
}: UploadOptionProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "p-6 cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-hover)]",
        "border-2 hover:border-primary/50",
        selected 
          ? "border-primary shadow-[var(--shadow-hover)] bg-primary/5" 
          : "border-border shadow-[var(--shadow-card)]"
      )}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={cn(
          "p-4 rounded-full transition-colors",
          selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
};
