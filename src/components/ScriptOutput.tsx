import { Code, Copy, Download } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import SettingsCard from "./SettingsCard";

interface Account {
  username: string;
  password: string;
}

interface ScriptOutputProps {
  accounts: Account[];
  settings: {
    userType: string;
    version: string;
    profile: string;
    comment: string;
    scriptDelay: number;
  };
}

const ScriptOutput = ({ accounts, settings }: ScriptOutputProps) => {
  const generateScript = () => {
    if (accounts.length === 0) return "";

    const lines = accounts.map((account, index) => {
      if (settings.userType === "usermanager") {
        if (settings.version === "v7") {
          return `/user-manager user add name="${account.username}" password="${account.password}" group="${settings.profile}"${settings.comment ? ` comment="${settings.comment}"` : ""}`;
        } else {
          return `/tool user-manager user add username="${account.username}" password="${account.password}" customer=admin`;
        }
      } else {
        return `/ip hotspot user add name="${account.username}" password="${account.password}" profile="${settings.profile}"${settings.comment ? ` comment="${settings.comment}"` : ""}`;
      }
    });

    if (settings.scriptDelay > 0) {
      return lines.join(`\n:delay ${settings.scriptDelay}ms\n`);
    }
    return lines.join("\n");
  };

  const script = generateScript();

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    toast.success("تم نسخ السكريبت بنجاح!");
  };

  const handleDownloadRsc = () => {
    const blob = new Blob([script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mikrotik-users.rsc";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("تم تحميل ملف .rsc");
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mikrotik-users.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("تم تحميل ملف .txt");
  };

  return (
    <SettingsCard title="السكريبت الناتج" icon={Code} delay={0.6}>
      <div className="space-y-4">
        <div className="relative">
          <pre className="input-glass p-4 rounded-lg overflow-x-auto text-sm text-muted-foreground min-h-[120px] max-h-[300px] overflow-y-auto font-mono text-left" dir="ltr">
            {script || "// سيظهر السكريبت هنا بعد توليد الحسابات"}
          </pre>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleCopy}
            disabled={!script}
            className="btn-primary"
          >
            <Copy className="w-4 h-4 ml-2" />
            نسخ
          </Button>
          <Button
            onClick={handleDownloadRsc}
            disabled={!script}
            variant="secondary"
            className="bg-secondary hover:bg-secondary/80"
          >
            <Download className="w-4 h-4 ml-2" />
            تحميل .rsc
          </Button>
          <Button
            onClick={handleDownloadTxt}
            disabled={!script}
            variant="secondary"
            className="bg-secondary hover:bg-secondary/80"
          >
            <Download className="w-4 h-4 ml-2" />
            تحميل .txt
          </Button>
        </div>
      </div>
    </SettingsCard>
  );
};

export default ScriptOutput;
