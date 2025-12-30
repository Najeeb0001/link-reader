interface ToggleOption {
  value: string;
  label: string;
}

interface ToggleGroupProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
}

const ToggleGroup = ({ options, value, onChange }: ToggleGroupProps) => {
  return (
    <div className="flex rounded-lg overflow-hidden border border-border/50">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
            value === option.value
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleGroup;
