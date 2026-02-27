"use client";

import { useAppStore } from "@/store/appStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export default function ProfilePanel() {
    const [profile, setProfile] = useState<any>(null);
    const [email, setEmail] = useState<string>('');
    const supabase = createClient();

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setEmail(user.email || '');
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                setProfile(data);
            }
        };
        fetchProfile();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    const getInitials = (name: string) => {
        if (!name) return "U";
        return name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();
    };

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex flex-col items-center gap-4 p-6 shrink-0 mt-4 border-b border-[--border]">
                <Avatar className="w-20 h-20 bg-[--bg-hover] text-[--text-primary] text-2xl font-semibold flex items-center justify-center">
                    <AvatarImage src={profile?.avatar_url || ''} alt="Avatar" />
                    <AvatarFallback>{getInitials(profile?.display_name || email || 'User')}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center gap-1">
                    <h2 className="text-xl font-semibold">{profile?.display_name || "User"}</h2>
                    <span className="text-sm text-[--text-muted]">{email}</span>
                </div>
                <div className="flex gap-2 w-full mt-2">
                    <Button variant="outline" size="sm" className="flex-1 h-8 text-xs border-[--border] text-[--text-secondary]">
                        Edit Profile
                    </Button>
                    <Button onClick={handleSignOut} variant="outline" size="sm" className="flex-1 h-8 text-xs border-[--border] hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 text-[--text-secondary] flex items-center gap-1 justify-center">
                        <LogOut className="w-3 h-3" /> Sign Out
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between text-center gap-4">
                    <div className="flex flex-col items-center flex-1">
                        <span className="text-2xl font-bold">{profile?.messages_reviewed || 0}</span>
                        <span className="text-[10px] uppercase tracking-wider text-[--text-muted] mt-1">Reviewed</span>
                    </div>
                    <Separator orientation="vertical" className="h-10 bg-[--border]" />
                    <div className="flex flex-col items-center flex-1">
                        <span className="text-2xl font-bold">{profile?.messages_rewritten || 0}</span>
                        <span className="text-[10px] uppercase tracking-wider text-[--text-muted] mt-1">Rewrites</span>
                    </div>
                    <Separator orientation="vertical" className="h-10 bg-[--border]" />
                    <div className="flex flex-col items-center flex-1">
                        <span className="text-2xl font-bold">{profile?.messages_blocked || 0}</span>
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
