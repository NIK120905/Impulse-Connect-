"use client";

import { useTheme } from "next-themes";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { useAppStore } from "@/store/appStore";

export default function SettingsPanel() {
    const { theme, setTheme } = useTheme();
    const [delay, setDelay] = useState([2]);
    const clearAllChats = useAppStore((state) => state.clearAllChats);

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex flex-col p-4 pb-2 shrink-0">
                <h2 className="text-xl font-semibold mb-1">Settings</h2>
            </div>

            <ScrollArea className="flex-1 w-full flex flex-col px-4 pb-6">
                <div className="flex flex-col gap-6 pt-4">
                    <section className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-[--text-muted] uppercase tracking-wider">Appearance</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Theme</span>
                            <ThemeToggle />
                        </div>
                    </section>

                    <Separator className="bg-[--border]" />

                    <section className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-[--text-muted] uppercase tracking-wider">Language</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Language</span>
                            <Select defaultValue="en">
                                <SelectTrigger className="w-[120px] h-8 text-xs border-[--border] bg-[--bg-card]">
                                    <SelectValue placeholder="Language" />
                                </SelectTrigger>
                                <SelectContent className="border-[--border] bg-[--bg-card]">
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Spanish</SelectItem>
                                    <SelectItem value="fr">French</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </section>

                    <Separator className="bg-[--border]" />

                    <section className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-[--text-muted] uppercase tracking-wider">Delay Default</h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Wait time</span>
                                <span className="text-xs text-[--text-muted]">{delay} hours</span>
                            </div>
                            <Slider
                                value={delay}
                                onValueChange={setDelay}
                                max={24}
                                step={1}
                                className="w-full"
                            />
                        </div>
                    </section>

                    <Separator className="bg-[--border]" />

                    <section className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-[--text-muted] uppercase tracking-wider">Notifications</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Email alerts</span>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Push notifications</span>
                            <Switch defaultChecked />
                        </div>
                    </section>

                    <Separator className="bg-[--border]" />

                    <section className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider">Data</h3>
                        <Button
                            variant="outline"
                            onClick={clearAllChats}
                            className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-600 transition-colors"
                        >
                            Clear all chat history
                        </Button>
                    </section>
                </div>
            </ScrollArea>
        </div>
    );
}
