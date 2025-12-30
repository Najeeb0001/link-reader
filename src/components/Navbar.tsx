import { Wifi, Sun, Moon } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center animate-glow-pulse">
                <Wifi className="w-7 h-7 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            </div>
            <div className="text-right">
              <h1 className="text-xl font-bold text-foreground">HashTik Mikrotik</h1>
              <p className="text-sm text-muted-foreground">مولد كروت وسكريبتات احترافي</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#generator" className="text-foreground hover:text-primary transition-colors font-medium">
              المولد
            </a>
            <a href="#settings" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              الإعدادات
            </a>
            <a href="#preview" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              المعاينة
            </a>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-foreground" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
