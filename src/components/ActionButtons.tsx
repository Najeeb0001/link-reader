import { Zap, FileText, Download } from "lucide-react";
import { Button } from "./ui/button";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useState } from "react";

interface ActionButtonsProps {
  onGenerate: () => void;
  onCreatePDF: () => void;
  isGenerating?: boolean;
}

const ActionButtons = ({ onGenerate, onCreatePDF, isGenerating }: ActionButtonsProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadZip = async () => {
    setIsDownloading(true);
    try {
      const zip = new JSZip();
      
      // Create PHP version of the website
      const phpContent = `<?php
/**
 * MikroTik Card Generator - PHP Version
 * Generated from Lovable React App
 */

session_start();

// Configuration
$config = [
    'title' => 'MikroTik Card Generator',
    'version' => '1.0.0',
    'charset' => 'UTF-8'
];

// Generate random code
function generateCode($type = 'alphanumeric', $length = 8) {
    $chars = '';
    switch($type) {
        case 'numeric':
            $chars = '0123456789';
            break;
        case 'alpha':
            $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        default:
            $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }
    $code = '';
    for ($i = 0; $i < $length; $i++) {
        $code .= $chars[random_int(0, strlen($chars) - 1)];
    }
    return $code;
}

// Generate accounts
function generateAccounts($count, $codeType, $codeLength, $prefix = '', $suffix = '') {
    $accounts = [];
    for ($i = 0; $i < $count; $i++) {
        $username = $prefix . generateCode($codeType, $codeLength) . $suffix;
        $password = generateCode($codeType, $codeLength);
        $accounts[] = [
            'username' => $username,
            'password' => $password,
            'serial' => str_pad($i + 1, 4, '0', STR_PAD_LEFT)
        ];
    }
    return $accounts;
}

// Generate MikroTik script
function generateScript($accounts, $userType, $version, $profile, $comment, $delay) {
    $script = "# MikroTik User Generator Script\\n";
    $script .= "# Generated: " . date('Y-m-d H:i:s') . "\\n\\n";
    
    foreach ($accounts as $account) {
        if ($version === '7') {
            $script .= "/user-manager user add name={$account['username']} password={$account['password']}";
            if ($profile) $script .= " profile=$profile";
            if ($comment) $script .= " comment=\\"$comment\\"";
        } else {
            if ($userType === 'ppp') {
                $script .= "/ppp secret add name={$account['username']} password={$account['password']}";
                if ($profile) $script .= " profile=$profile";
            } else {
                $script .= "/ip hotspot user add name={$account['username']} password={$account['password']}";
                if ($profile) $script .= " profile=$profile";
            }
            if ($comment) $script .= " comment=\\"$comment\\"";
        }
        $script .= "\\n";
        if ($delay > 0) {
            $script .= ":delay {$delay}s\\n";
        }
    }
    
    return $script;
}

// Handle form submission
$accounts = [];
$script = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $count = intval($_POST['count'] ?? 10);
    $codeType = $_POST['codeType'] ?? 'alphanumeric';
    $codeLength = intval($_POST['codeLength'] ?? 8);
    $prefix = $_POST['prefix'] ?? '';
    $suffix = $_POST['suffix'] ?? '';
    $userType = $_POST['userType'] ?? 'hotspot';
    $version = $_POST['version'] ?? '6';
    $profile = $_POST['profile'] ?? '';
    $comment = $_POST['comment'] ?? '';
    $delay = intval($_POST['delay'] ?? 0);
    
    $accounts = generateAccounts($count, $codeType, $codeLength, $prefix, $suffix);
    $script = generateScript($accounts, $userType, $version, $profile, $comment, $delay);
}
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="<?= $config['charset'] ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $config['title'] ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Cairo', sans-serif; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); min-height: 100vh; }
        .card { background: rgba(30, 41, 59, 0.8); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); border-radius: 1rem; }
        .btn-primary { background: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%); }
        .btn-primary:hover { background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%); }
        .input-glass { background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.1); }
        .input-glass:focus { border-color: #0ea5e9; outline: none; box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.2); }
    </style>
</head>
<body class="text-white p-4 md:p-8">
    <div class="container mx-auto max-w-6xl">
        <header class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                مولد بطاقات MikroTik
            </h1>
            <p class="text-gray-400 text-lg">أنشئ بطاقات احترافية وسكربتات MikroTik بسهولة</p>
        </header>

        <form method="POST" class="space-y-8">
            <div class="grid md:grid-cols-2 gap-6">
                <!-- MikroTik Settings -->
                <div class="card p-6">
                    <h2 class="text-xl font-bold mb-6 text-sky-400">إعدادات MikroTik</h2>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm text-gray-400 mb-2">نوع المستخدم</label>
                            <select name="userType" class="w-full input-glass rounded-lg p-3 text-white">
                                <option value="hotspot">Hotspot</option>
                                <option value="ppp">PPP</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm text-gray-400 mb-2">إصدار MikroTik</label>
                            <select name="version" class="w-full input-glass rounded-lg p-3 text-white">
                                <option value="6">RouterOS v6</option>
                                <option value="7">RouterOS v7</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm text-gray-400 mb-2">البروفايل</label>
                            <input type="text" name="profile" placeholder="default" class="w-full input-glass rounded-lg p-3 text-white">
                        </div>
                        <div>
                            <label class="block text-sm text-gray-400 mb-2">التعليق</label>
                            <input type="text" name="comment" placeholder="Generated User" class="w-full input-glass rounded-lg p-3 text-white">
                        </div>
                    </div>
                </div>

                <!-- Generator Settings -->
                <div class="card p-6">
                    <h2 class="text-xl font-bold mb-6 text-sky-400">إعدادات التوليد</h2>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm text-gray-400 mb-2">نوع الكود</label>
                            <select name="codeType" class="w-full input-glass rounded-lg p-3 text-white">
                                <option value="alphanumeric">أحرف وأرقام</option>
                                <option value="numeric">أرقام فقط</option>
                                <option value="alpha">أحرف فقط</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm text-gray-400 mb-2">طول الكود</label>
                            <input type="number" name="codeLength" value="8" min="4" max="32" class="w-full input-glass rounded-lg p-3 text-white">
                        </div>
                        <div>
                            <label class="block text-sm text-gray-400 mb-2">عدد الحسابات</label>
                            <input type="number" name="count" value="10" min="1" max="1000" class="w-full input-glass rounded-lg p-3 text-white">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm text-gray-400 mb-2">البادئة</label>
                                <input type="text" name="prefix" class="w-full input-glass rounded-lg p-3 text-white">
                            </div>
                            <div>
                                <label class="block text-sm text-gray-400 mb-2">اللاحقة</label>
                                <input type="text" name="suffix" class="w-full input-glass rounded-lg p-3 text-white">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm text-gray-400 mb-2">التأخير (ثواني)</label>
                            <input type="number" name="delay" value="0" min="0" max="60" class="w-full input-glass rounded-lg p-3 text-white">
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <button type="submit" class="btn-primary text-white font-bold py-4 px-12 rounded-xl text-lg transition-all hover:scale-105">
                    توليد الحسابات
                </button>
            </div>
        </form>

        <?php if (!empty($accounts)): ?>
        <div class="mt-12 space-y-8">
            <!-- Generated Accounts -->
            <div class="card p-6">
                <h2 class="text-xl font-bold mb-6 text-sky-400">الحسابات المولدة (<?= count($accounts) ?>)</h2>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b border-white/10">
                                <th class="text-right py-3 px-4">#</th>
                                <th class="text-right py-3 px-4">اسم المستخدم</th>
                                <th class="text-right py-3 px-4">كلمة المرور</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($accounts as $i => $account): ?>
                            <tr class="border-b border-white/5 hover:bg-white/5">
                                <td class="py-3 px-4"><?= $i + 1 ?></td>
                                <td class="py-3 px-4 font-mono text-sky-400"><?= htmlspecialchars($account['username']) ?></td>
                                <td class="py-3 px-4 font-mono"><?= htmlspecialchars($account['password']) ?></td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Script Output -->
            <div class="card p-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold text-sky-400">سكربت MikroTik</h2>
                    <button onclick="copyScript()" class="bg-sky-500/20 text-sky-400 px-4 py-2 rounded-lg hover:bg-sky-500/30 transition-colors">
                        نسخ السكربت
                    </button>
                </div>
                <pre id="script" class="input-glass rounded-lg p-4 overflow-x-auto text-sm font-mono text-green-400 whitespace-pre-wrap"><?= htmlspecialchars($script) ?></pre>
            </div>
        </div>
        <?php endif; ?>

        <footer class="mt-16 text-center text-gray-500 text-sm">
            <p>MikroTik Card Generator - PHP Version</p>
            <p class="mt-2">تم إنشاؤه بواسطة Lovable</p>
        </footer>
    </div>

    <script>
        function copyScript() {
            const script = document.getElementById('script').textContent;
            navigator.clipboard.writeText(script).then(() => {
                alert('تم نسخ السكربت!');
            });
        }
    </script>
</body>
</html>`;

      // Add files to ZIP
      zip.file("index.php", phpContent);
      zip.file("README.md", `# MikroTik Card Generator - PHP Version

## المتطلبات
- PHP 7.4 أو أحدث
- خادم ويب (Apache/Nginx)

## التثبيت
1. ارفع الملفات إلى خادم الويب
2. تأكد من تفعيل PHP
3. افتح index.php في المتصفح

## الميزات
- توليد حسابات MikroTik
- دعم Hotspot و PPP
- دعم RouterOS v6 و v7
- تخصيص طول الكود ونوعه
- إضافة بادئة ولاحقة
- توليد سكربت جاهز للاستخدام

## تم إنشاؤه بواسطة
Lovable - https://lovable.dev
`);

      // Generate ZIP file
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "mikrotik-generator-php.zip");
    } catch (error) {
      console.error("Error creating ZIP:", error);
    } finally {
      setIsDownloading(false);
    }
  };

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
      <Button
        onClick={handleDownloadZip}
        disabled={isDownloading}
        variant="outline"
        className="px-8 py-6 text-lg border-sky-500/50 text-sky-400 hover:bg-sky-500/10"
      >
        <Download className="w-5 h-5 ml-2" />
        {isDownloading ? "جاري التحميل..." : "تحميل نسخة PHP"}
      </Button>
    </div>
  );
};

export default ActionButtons;
