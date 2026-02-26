"use client";

import { useAppStore } from "@/store/appStore";
import { Share2, Trash2, AlignJustify } from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import DefaultState from "@/components/chat/DefaultState";
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";

export default function ChatArea() {
    const {
        activeChatId,
        chats,
        isPanelOpen,
        togglePanel,
        deleteChat,
        updateChatTitle
    } = useAppStore();

    const activeChat = chats.find(c => c.id === activeChatId);

    return (
        <main className="flex-1 h-full flex flex-col relative min-w-0 bg-[--bg-primary]">
            {/* Top Header */}
            <header className="h-14 shrink-0 flex items-center justify-between px-4 border-b border-transparent">
                <div className="flex items-center gap-3 w-full min-w-0">
                    {!isPanelOpen && (
                        <Button variant="ghost" size="icon" onClick={togglePanel} className="text-[--text-muted]">
                            <AlignJustify className="h-5 w-5" />
                        </Button>
                    )}
                    {activeChat && (
                        <input
                            type="text"
                            value={activeChat.title}
                            onChange={(e) => updateChatTitle(activeChat.id, e.target.value)}
                            className="font-medium text-[lg] bg-transparent outline-none border-none py-1 truncate min-w-0 flex-1 hover:bg-[--bg-hover] focus:bg-[--bg-hover] rounded px-2 transition-colors -ml-2 text-[--text-primary]"
                        />
                    )}
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-4">
                    {activeChat && (
                        <>
                            <Button variant="ghost" size="icon" aria-label="Share">
                                <Share2 className="h-[18px] w-[18px] text-[--text-muted]" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Delete"
                                className="hover:text-red-500 hover:bg-red-500/10"
                                onClick={() => deleteChat(activeChat.id)}
                            >
                                <Trash2 className="h-[18px] w-[18px]" />
                            </Button>
                        </>
                    )}
                    <div className="ml-2 pl-2 border-l border-[--border]">
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 w-full overflow-hidden flex flex-col">
                {!activeChat ? (
                    <DefaultState />
                ) : activeChat.messages.length === 0 ? (
                    <DefaultState />
                ) : (
                    <MessageList messages={activeChat.messages} />
                )}
            </div>

            {/* Input Area */}
            <div className="w-full px-4 pb-4 md:px-8 lg:px-16 xl:px-32 max-w-5xl mx-auto shrink-0 relative z-10">
                <ChatInput />
            </div>
        </main>
    );
}
