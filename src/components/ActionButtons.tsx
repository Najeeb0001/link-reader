import { Zap, FileText } from "lucide-react";
import { Button } from "./ui/button";

interface ActionButtonsProps {
  onGenerate: () => void;
  onCreatePDF: () => void;
  isGenerating?: boolean;
}

const ActionButtons = ({ onGenerate, onCreatePDF, isGenerating }: ActionButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.35s" }}>
      <Button
        onClick={onGenerate}
        disabled={isGenerating}
        className="btn-primary px-8 py-6 text-lg glow-primary"
      >
        <Zap className="w-5 h-5 ml-2" />
        {isGenerating ? "جاري التوليد..." : "توليد الحسابات"}
      </Button>
      <Button
        onClick={onCreatePDF}
        variant="secondary"
        className="px-8 py-6 text-lg bg-secondary hover:bg-secondary/80"
      >
        <FileText className="w-5 h-5 ml-2" />
        إنشاء PDF
      </Button>
    </div>
  );
};

export default ActionButtons;
