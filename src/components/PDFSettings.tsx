import { Printer, Image, Columns, Rows3, Move, Type, Palette } from "lucide-react";
import SettingsCard from "./SettingsCard";
import FormField from "./FormField";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface PDFSettingsProps {
  settings: {
    backgroundImage: string;
    columns: number;
    rows: number;
    cardSpacing: number;
    printUsername: boolean;
    printPassword: boolean;
    printSerial: boolean;
    printDate: boolean;
    usernameFontSize: number;
    usernameColor: string;
    usernameBold: boolean;
    usernameX: number;
    usernameY: number;
    passwordFontSize: number;
    passwordColor: string;
    passwordBold: boolean;
    passwordX: number;
    passwordY: number;
  };
  onChange: (key: string, value: string | number | boolean) => void;
}

const PDFSettings = ({ settings, onChange }: PDFSettingsProps) => {
  return (
    <SettingsCard title="إعدادات PDF والطباعة" icon={Printer} delay={0.4}>
      <div className="space-y-8">
        {/* Main Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FormField label="صورة الخلفية" icon={Image}>
            <Input
              type="file"
              accept="image/*"
              className="input-glass"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    onChange("backgroundImage", event.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </FormField>

          <FormField label="الأعمدة" icon={Columns}>
            <Input
              type="number"
              className="input-glass"
              value={settings.columns}
              onChange={(e) => onChange("columns", parseInt(e.target.value) || 4)}
              min={1}
              max={10}
            />
          </FormField>

          <FormField label="الصفوف" icon={Rows3}>
            <Input
              type="number"
              className="input-glass"
              value={settings.rows}
              onChange={(e) => onChange("rows", parseInt(e.target.value) || 10)}
              min={1}
              max={20}
            />
          </FormField>

          <FormField label="المسافة بين الكروت (mm)" icon={Move}>
            <Input
              type="number"
              className="input-glass"
              value={settings.cardSpacing}
              onChange={(e) => onChange("cardSpacing", parseInt(e.target.value) || 2)}
              min={0}
              max={20}
            />
          </FormField>
        </div>

        {/* Print Options */}
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Checkbox
              id="printUsername"
              checked={settings.printUsername}
              onCheckedChange={(checked) => onChange("printUsername", checked as boolean)}
            />
            <Label htmlFor="printUsername">طباعة اسم المستخدم</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="printPassword"
              checked={settings.printPassword}
              onCheckedChange={(checked) => onChange("printPassword", checked as boolean)}
            />
            <Label htmlFor="printPassword">طباعة كلمة السر</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="printSerial"
              checked={settings.printSerial}
              onCheckedChange={(checked) => onChange("printSerial", checked as boolean)}
            />
            <Label htmlFor="printSerial">طباعة رقم تسلسلي</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="printDate"
              checked={settings.printDate}
              onCheckedChange={(checked) => onChange("printDate", checked as boolean)}
            />
            <Label htmlFor="printDate">طباعة التاريخ</Label>
          </div>
        </div>

        {/* Username Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground border-b border-border/50 pb-2">إعدادات اسم المستخدم</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <FormField label="حجم النص (pt)" icon={Type}>
              <Input
                type="number"
                className="input-glass"
                value={settings.usernameFontSize}
                onChange={(e) => onChange("usernameFontSize", parseInt(e.target.value) || 12)}
              />
            </FormField>
            <FormField label="اللون" icon={Palette}>
              <Input
                type="color"
                className="input-glass h-10"
                value={settings.usernameColor}
                onChange={(e) => onChange("usernameColor", e.target.value)}
              />
            </FormField>
            <div className="flex items-end">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="usernameBold"
                  checked={settings.usernameBold}
                  onCheckedChange={(checked) => onChange("usernameBold", checked as boolean)}
                />
                <Label htmlFor="usernameBold">غامق</Label>
              </div>
            </div>
            <FormField label="أفقياً (mm)">
              <Input
                type="number"
                className="input-glass"
                value={settings.usernameX}
                onChange={(e) => onChange("usernameX", parseInt(e.target.value) || 0)}
              />
            </FormField>
            <FormField label="عمودياً (mm)">
              <Input
                type="number"
                className="input-glass"
                value={settings.usernameY}
                onChange={(e) => onChange("usernameY", parseInt(e.target.value) || 0)}
              />
            </FormField>
          </div>
        </div>

        {/* Password Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground border-b border-border/50 pb-2">إعدادات كلمة السر</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <FormField label="حجم النص (pt)" icon={Type}>
              <Input
                type="number"
                className="input-glass"
                value={settings.passwordFontSize}
                onChange={(e) => onChange("passwordFontSize", parseInt(e.target.value) || 12)}
              />
            </FormField>
            <FormField label="اللون" icon={Palette}>
              <Input
                type="color"
                className="input-glass h-10"
                value={settings.passwordColor}
                onChange={(e) => onChange("passwordColor", e.target.value)}
              />
            </FormField>
            <div className="flex items-end">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="passwordBold"
                  checked={settings.passwordBold}
                  onCheckedChange={(checked) => onChange("passwordBold", checked as boolean)}
                />
                <Label htmlFor="passwordBold">غامق</Label>
              </div>
            </div>
            <FormField label="أفقياً (mm)">
              <Input
                type="number"
                className="input-glass"
                value={settings.passwordX}
                onChange={(e) => onChange("passwordX", parseInt(e.target.value) || 0)}
              />
            </FormField>
            <FormField label="عمودياً (mm)">
              <Input
                type="number"
                className="input-glass"
                value={settings.passwordY}
                onChange={(e) => onChange("passwordY", parseInt(e.target.value) || 0)}
              />
            </FormField>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
};

export default PDFSettings;
