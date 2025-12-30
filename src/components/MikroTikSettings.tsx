import { Settings2, Tag, MessageSquare, MapPin } from "lucide-react";
import SettingsCard from "./SettingsCard";
import FormField from "./FormField";
import ToggleGroup from "./ToggleGroup";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface MikroTikSettingsProps {
  settings: {
    userType: string;
    version: string;
    profile: string;
    comment: string;
    location: string;
  };
  onChange: (key: string, value: string) => void;
}

const MikroTikSettings = ({ settings, onChange }: MikroTikSettingsProps) => {
  return (
    <SettingsCard title="إعدادات MikroTik" icon={Settings2} delay={0.2}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FormField label="نوع المستخدمين" icon={Settings2}>
          <ToggleGroup
            options={[
              { value: "usermanager", label: "User Manager" },
              { value: "hotspot", label: "Hotspot" },
            ]}
            value={settings.userType}
            onChange={(v) => onChange("userType", v)}
          />
        </FormField>

        <FormField label="إصدار MikroTik" icon={Tag}>
          <ToggleGroup
            options={[
              { value: "v6", label: "RouterOS v6" },
              { value: "v7", label: "RouterOS v7" },
            ]}
            value={settings.version}
            onChange={(v) => onChange("version", v)}
          />
        </FormField>

        <FormField label="البروفايل" icon={Tag}>
          <Select value={settings.profile} onValueChange={(v) => onChange("profile", v)}>
            <SelectTrigger className="input-glass">
              <SelectValue placeholder="اختر البروفايل" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">default</SelectItem>
              <SelectItem value="premium">premium</SelectItem>
              <SelectItem value="basic">basic</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="التعليق" icon={MessageSquare}>
          <Input
            className="input-glass"
            placeholder="اختياري"
            value={settings.comment}
            onChange={(e) => onChange("comment", e.target.value)}
          />
        </FormField>

        <FormField label="الموقع / الرقم التسلسلي" icon={MapPin} hint="اختياري">
          <Input
            className="input-glass"
            placeholder="اختياري"
            value={settings.location}
            onChange={(e) => onChange("location", e.target.value)}
          />
        </FormField>
      </div>
    </SettingsCard>
  );
};

export default MikroTikSettings;
