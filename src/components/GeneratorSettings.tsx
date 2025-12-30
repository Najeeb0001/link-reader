import { Key, Hash, Type, Clock, Layers } from "lucide-react";
import SettingsCard from "./SettingsCard";
import FormField from "./FormField";
import ToggleGroup from "./ToggleGroup";
import { Input } from "./ui/input";

interface GeneratorSettingsProps {
  settings: {
    codeType: string;
    matchType: string;
    codeLength: number;
    accountCount: number;
    prefix: string;
    usernameSuffix: string;
    passwordSuffix: string;
    scriptDelay: number;
  };
  onChange: (key: string, value: string | number) => void;
}

const GeneratorSettings = ({ settings, onChange }: GeneratorSettingsProps) => {
  return (
    <SettingsCard title="إعدادات توليد الحسابات" icon={Key} delay={0.3}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FormField label="نوع الكود" icon={Type}>
          <ToggleGroup
            options={[
              { value: "alphanumeric", label: "أرقام وحروف" },
              { value: "numeric", label: "أرقام فقط" },
              { value: "alpha", label: "حروف فقط" },
            ]}
            value={settings.codeType}
            onChange={(v) => onChange("codeType", v)}
          />
        </FormField>

        <FormField label="تطابق الاسم والسر" icon={Key}>
          <ToggleGroup
            options={[
              { value: "different", label: "مختلفة" },
              { value: "same", label: "متشابهة" },
              { value: "empty", label: "كلمة سر فارغة" },
            ]}
            value={settings.matchType}
            onChange={(v) => onChange("matchType", v)}
          />
        </FormField>

        <FormField label="طول الكود" icon={Hash}>
          <Input
            type="number"
            className="input-glass"
            value={settings.codeLength}
            onChange={(e) => onChange("codeLength", parseInt(e.target.value) || 8)}
            min={4}
            max={32}
          />
        </FormField>

        <FormField label="عدد الحسابات" icon={Layers}>
          <Input
            type="number"
            className="input-glass"
            value={settings.accountCount}
            onChange={(e) => onChange("accountCount", parseInt(e.target.value) || 50)}
            min={1}
            max={1000}
          />
        </FormField>

        <FormField label="البادئة" icon={Type}>
          <Input
            className="input-glass"
            placeholder="مثال: user_"
            value={settings.prefix}
            onChange={(e) => onChange("prefix", e.target.value)}
          />
        </FormField>

        <FormField label="النهاية (اسم المستخدم)" icon={Type}>
          <Input
            className="input-glass"
            placeholder="مثال: _end"
            value={settings.usernameSuffix}
            onChange={(e) => onChange("usernameSuffix", e.target.value)}
          />
        </FormField>

        <FormField label="النهاية (كلمة السر)" icon={Key}>
          <Input
            className="input-glass"
            placeholder="مثال: _pass"
            value={settings.passwordSuffix}
            onChange={(e) => onChange("passwordSuffix", e.target.value)}
          />
        </FormField>

        <FormField label="تأخير السكريبت (ms)" icon={Clock}>
          <Input
            type="number"
            className="input-glass"
            value={settings.scriptDelay}
            onChange={(e) => onChange("scriptDelay", parseInt(e.target.value) || 100)}
            min={0}
            max={5000}
          />
        </FormField>
      </div>
    </SettingsCard>
  );
};

export default GeneratorSettings;
