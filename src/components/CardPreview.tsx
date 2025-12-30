import { Eye } from "lucide-react";
import SettingsCard from "./SettingsCard";

interface Account {
  username: string;
  password: string;
}

interface CardPreviewProps {
  accounts: Account[];
  backgroundImage?: string;
}

const CardPreview = ({ accounts, backgroundImage }: CardPreviewProps) => {
  const previewAccount = accounts[0] || { username: "user123", password: "pass456" };

  return (
    <SettingsCard title="معاينة الكرت" icon={Eye} delay={0.5}>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">أبعاد الكرت: 50.0 × 14.4 مم</p>
        
        <div 
          className="relative w-full max-w-md mx-auto aspect-[3.5/1] rounded-lg border border-border/50 overflow-hidden flex items-center justify-center"
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: backgroundImage ? undefined : "hsl(var(--secondary))",
          }}
        >
          {accounts.length > 0 ? (
            <div className="text-center space-y-1 p-4">
              <p className="text-sm font-bold text-foreground">المستخدم: {previewAccount.username}</p>
              <p className="text-sm text-muted-foreground">كلمة السر: {previewAccount.password}</p>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">تظهر المعاينة هنا بعد التوليد</p>
          )}
        </div>
      </div>
    </SettingsCard>
  );
};

export default CardPreview;
