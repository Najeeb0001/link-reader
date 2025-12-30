import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface SettingsCardProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  delay?: number;
}

const SettingsCard = ({ title, icon: Icon, children, delay = 0 }: SettingsCardProps) => {
  return (
    <div
      className="card-glass p-6 animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="section-title mb-6">
        <div className="w-1 h-6 bg-primary rounded-full" />
        <Icon className="w-5 h-5 text-primary" />
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
};

export default SettingsCard;
