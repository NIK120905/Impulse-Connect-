"use client";

import { useAppStore } from "@/store/appStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ProfilePanel() {
    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex flex-col items-center gap-4 p-6 shrink-0 mt-4 border-b border-[--border]">
                <Avatar className="w-20 h-20 bg-[--bg-hover] text-[--text-primary] text-2xl font-semibold flex items-center justify-center">
                    <AvatarFallback>YN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center gap-1">
                    <h2 className="text-xl font-semibold">Your Name</h2>
                    <span className="text-sm text-[--text-muted]">you@email.com</span>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs border-[--border] text-[--text-secondary]">
                    Edit Profile
                </Button>
            </div>

            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between text-center gap-4">
                    <div className="flex flex-col items-center flex-1">
                        <span className="text-2xl font-bold">24</span>
                        <span className="text-[10px] uppercase tracking-wider text-[--text-muted] mt-1">Reviewed</span>
                    </div>
                    <Separator orientation="vertical" className="h-10 bg-[--border]" />
                    <div className="flex flex-col items-center flex-1">
                        <span className="text-2xl font-bold">18</span>
                        <span className="text-[10px] uppercase tracking-wider text-[--text-muted] mt-1">Rewrites</span>
                    </div>
                    <Separator orientation="vertical" className="h-10 bg-[--border]" />
                    <div className="flex flex-col items-center flex-1">
                        <span className="text-2xl font-bold">6</span>
                        <span className="text-[10px] uppercase tracking-wider text-[--text-muted] mt-1">Blocked</span>
                    </div>
                </div>

                <Separator className="bg-[--border] my-2" />

                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-semibold text-red-500 uppercase tracking-wider">Danger Zone</h3>
                    <Button variant="outline" className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-600 transition-colors">
                        Delete Account
                    </Button>
                </div>
            </div>
        </div>
    );
}
