import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MikroTikSettings from "@/components/MikroTikSettings";
import GeneratorSettings from "@/components/GeneratorSettings";
import PDFSettings from "@/components/PDFSettings";
import CardPreview from "@/components/CardPreview";
import ScriptOutput from "@/components/ScriptOutput";
import ActionButtons from "@/components/ActionButtons";

interface Account {
  username: string;
  password: string;
}

const Index = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const [mikrotikSettings, setMikrotikSettings] = useState({
    userType: "usermanager",
    version: "v7",
    profile: "default",
    comment: "",
    location: "",
  });

  const [generatorSettings, setGeneratorSettings] = useState({
    codeType: "alphanumeric",
    matchType: "different",
    codeLength: 8,
    accountCount: 50,
    prefix: "",
    usernameSuffix: "",
    passwordSuffix: "",
    scriptDelay: 100,
  });

  const [pdfSettings, setPdfSettings] = useState({
    backgroundImage: "",
    columns: 4,
    rows: 10,
    cardSpacing: 2,
    printUsername: true,
    printPassword: true,
    printSerial: false,
    printDate: false,
    usernameFontSize: 12,
    usernameColor: "#000000",
    usernameBold: true,
    usernameX: 25,
    usernameY: 5,
    passwordFontSize: 12,
    passwordColor: "#666666",
    passwordBold: false,
    passwordX: 25,
    passwordY: 10,
  });

  const generateCode = (length: number, type: string): string => {
    let chars = "";
    if (type === "alphanumeric" || type === "alpha") {
      chars += "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz";
    }
    if (type === "alphanumeric" || type === "numeric") {
      chars += "23456789";
    }
    
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const newAccounts: Account[] = [];
      
      for (let i = 0; i < generatorSettings.accountCount; i++) {
        const usernameCode = generateCode(generatorSettings.codeLength, generatorSettings.codeType);
        let passwordCode = "";
        
        if (generatorSettings.matchType === "same") {
          passwordCode = usernameCode;
        } else if (generatorSettings.matchType === "different") {
          passwordCode = generateCode(generatorSettings.codeLength, generatorSettings.codeType);
        }
        
        newAccounts.push({
          username: `${generatorSettings.prefix}${usernameCode}${generatorSettings.usernameSuffix}`,
          password: `${passwordCode}${generatorSettings.passwordSuffix}`,
        });
      }
      
      setAccounts(newAccounts);
      setIsGenerating(false);
      toast.success(`تم توليد ${newAccounts.length} حساب بنجاح!`);
    }, 500);
  };

  const handleCreatePDF = () => {
    if (accounts.length === 0) {
      toast.error("يرجى توليد الحسابات أولاً");
      return;
    }
    toast.info("ميزة إنشاء PDF قيد التطوير");
  };

  const handleMikrotikChange = (key: string, value: string) => {
    setMikrotikSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleGeneratorChange = (key: string, value: string | number) => {
    setGeneratorSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handlePdfChange = (key: string, value: string | number | boolean) => {
    setPdfSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pb-16">
        <HeroSection />
        
        <div className="space-y-6" id="settings">
          <MikroTikSettings settings={mikrotikSettings} onChange={handleMikrotikChange} />
          
          <GeneratorSettings settings={generatorSettings} onChange={handleGeneratorChange} />
          
          <ActionButtons 
            onGenerate={handleGenerate} 
            onCreatePDF={handleCreatePDF}
            isGenerating={isGenerating}
          />
          
          <PDFSettings settings={pdfSettings} onChange={handlePdfChange} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="preview">
            <CardPreview accounts={accounts} backgroundImage={pdfSettings.backgroundImage} />
            <ScriptOutput 
              accounts={accounts} 
              settings={{
                userType: mikrotikSettings.userType,
                version: mikrotikSettings.version,
                profile: mikrotikSettings.profile,
                comment: mikrotikSettings.comment,
                scriptDelay: generatorSettings.scriptDelay,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
