"use client";

import { useAppStore } from "@/store/appStore";
import { Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Chat } from "@/lib/types";

export default function ChatsPanel() {
    const { chats, activeChatId, setActiveChatId, deleteChat } = useAppStore();
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredChats = chats.filter((chat) =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groups = {
        "TODAY": filteredChats.filter(c => c.dateGroup === "TODAY"),
        "YESTERDAY": filteredChats.filter(c => c.dateGroup === "YESTERDAY"),
        "THIS WEEK": filteredChats.filter(c => c.dateGroup === "THIS WEEK"),
        "EARLIER": filteredChats.filter(c => c.dateGroup === "EARLIER"),
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemAnim = {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex flex-col p-4 pb-2 shrink-0">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">Chats</h2>
                    <button
                        onClick={() => setShowSearch(!showSearch)}
                        className="p-1.5 hover:bg-[--bg-hover] rounded-lg transition-colors text-[--text-muted] hover:text-[--text-primary]"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </div>

                <AnimatePresence>
                    {showSearch && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                            animate={{ height: "auto", opacity: 1, marginBottom: 8 }}
                            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                            className="overflow-hidden"
                        >
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[--bg-primary] border border-[--border] text-sm rounded-lg px-3 py-2 outline-none focus:border-[--text-muted] transition-colors"
                                autoFocus
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <ScrollArea className="flex-1 w-full flex flex-col px-2">
                <motion.div
                    className="flex flex-col gap-6 pb-6 pt-2"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                >
                    {Object.entries(groups).map(([label, groupChats]) => {
                        if (groupChats.length === 0) return null;
                        return (
                            <div key={label} className="flex flex-col gap-1">
                                <h3 className="text-[10px] font-semibold tracking-widest text-[--text-muted] uppercase px-3 mb-1">
                                    {label}
                                </h3>
                                {groupChats.map((chat: Chat) => (
                                    <motion.div
                                        variants={itemAnim}
                                        key={chat.id}
                                        onClick={() => setActiveChatId(chat.id)}
                                        className={cn(
                                            "group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors w-full",
                                            activeChatId === chat.id
                                                ? "bg-[--bg-active]"
                                                : "hover:bg-[--bg-hover]"
                                        )}
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className={cn("w-2 h-2 rounded-full shrink-0", chat.colorDot)} />
                                            <div className="flex flex-col overflow-hidden">
                                                <span className="text-sm font-medium truncate text-[--text-primary]">
                                                    {chat.title}
                                                </span>
                                                <span className="text-[11px] text-[--text-muted]">
                                                    {chat.timestampStr}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteChat(chat.id);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-[--bg-hover] hover:text-red-500 rounded-lg transition-all text-[--text-muted] shrink-0"
                                        >
                                            <Trash2 className="w-[14px] h-[14px]" />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        );
                    })}
                </motion.div>
            </ScrollArea>
        </div>
    );
}
