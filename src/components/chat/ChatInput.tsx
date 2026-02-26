"use client";

import { useAppStore } from "@/store/appStore";
import { getMockResponse } from "@/lib/mockResponses";
import { useState, useRef, useEffect } from "react";
import { Mic, Paperclip, Send, FileText, SlidersHorizontal, Pause } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function ChatInput() {
    const { activeChatId, addMessage, createNewChat } = useAppStore();
    const [input, setInput] = useState("");
    const { toast } = useToast();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [input]);

    const handleSend = () => {
        if (!input.trim()) return;

        let chatId = activeChatId;
        if (!chatId) {
            chatId = createNewChat();
        }

        const userMessage = {
            id: `msg_${Date.now()}`,
            role: "user" as const,
            content: input.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        addMessage(chatId, userMessage);
        setInput("");

        // Simulate AI thinking and response
        setTimeout(() => {
            const analysis = getMockResponse(userMessage.content);
            const aiMessage = {
                id: `ai_${Date.now()}`,
                role: "ai" as const,
                content: `I've analyzed your message. Here's what I found:`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                analysis
            };
            // Typescript complains about chatId being null but we just handled it above
            // @ts-ignore
            addMessage(chatId, aiMessage);
        }, 1200);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col gap-2 w-full pt-2">
            <div
                className={cn(
                    "bg-[--bg-card] border rounded-2xl shadow-sm transition-colors relative flex flex-col group",
                    input ? "border-[--text-muted]" : "border-[--border]"
                )}
            >
                {!input && (
                    <span className="absolute left-4 top-3 text-[--text-muted] pointer-events-none select-none text-[15px]">
                        / Search or type a command...
                    </span>
                )}

                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Paste the message you're about to send..."
                    className="w-full bg-transparent resize-none border-none outline-none py-3 px-4 min-h-[44px] max-h-[120px] text-[15px] placeholder:text-transparent leading-relaxed"
                    rows={1}
                />

                <div className="flex items-center justify-between px-3 pb-2 pt-1 border-t border-[--border] mt-auto">
                    <div className="flex items-center gap-1.5 cursor-pointer text-[--text-muted] hover:text-[--text-primary] px-2 py-1 rounded transition-colors group/prompts">
                        <FileText className="w-4 h-4" strokeWidth={2} />
                        <span className="text-xs font-semibold tracking-wide">My Prompts</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            className="p-2 text-[--text-muted] hover:bg-[--bg-hover] hover:text-[--text-primary] rounded-lg transition-colors"
                            title="Filters"
                        >
                            <SlidersHorizontal className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                        <button
                            className="p-2 text-[--text-muted] hover:bg-[--bg-hover] hover:text-[--text-primary] rounded-lg transition-colors"
                            title="Attach File"
                        >
                            <Paperclip className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                        <button
                            className="p-2 text-[--text-muted] hover:bg-[--bg-hover] hover:text-[--text-primary] rounded-lg transition-colors"
                            onClick={() => toast({ title: "Coming soon", description: "Voice input is not yet available." })}
                            title="Voice Input"
                        >
                            <Mic className="w-4 h-4" strokeWidth={2.5} />
                        </button>

                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className={cn(
                                "p-2 ml-1 rounded-lg transition-all flex items-center justify-center bg-[--text-primary] text-[--bg-primary]",
                                !input.trim() ? "opacity-30 cursor-not-allowed" : "hover:opacity-90 active:scale-95"
                            )}
                        >
                            <Send className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-center w-full mt-2">
                <p className="text-[10px] text-[--text-muted]">AI can make mistakes. Consider verifying important information.</p>
            </div>
        </div>
    );
}
