"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="w-10 h-6 shrink-0" />;

    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    return (
        <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-[--text-muted]" strokeWidth={2.5} />
            <Switch
                checked={isDark}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                className="w-[38px] h-[20px] transition-colors bg-[--bg-hover] data-[state=checked]:bg-[--text-secondary]"
                aria-label="Toggle theme"
            />
            <Moon className="h-4 w-4 text-[--text-muted]" strokeWidth={2.5} />
        </div>
    );
}
