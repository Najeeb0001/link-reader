import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  icon?: LucideIcon;
  children: ReactNode;
  hint?: string;
}

const FormField = ({ label, icon: Icon, children, hint }: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
        {label}
        {hint && <span className="text-muted-foreground text-xs">({hint})</span>}
      </label>
      {children}
    </div>
  );
};

export default FormField;
