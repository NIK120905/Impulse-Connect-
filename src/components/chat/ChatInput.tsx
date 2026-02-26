"use client";

import { useAppStore } from "@/store/appStore";
import { getMockResponse } from "@/lib/mockResponses";
import { useState, useRef, useEffect } from "react";
import { Mic, Paperclip, Send, FileText, SlidersHorizontal, Pause } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Add global interface for SpeechRecognition
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export default function ChatInput() {
    const { activeChatId, addMessage, createNewChat } = useAppStore();
    const [input, setInput] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [activeTone, setActiveTone] = useState<"Formal" | "Informal" | "Casual" | null>(null);
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

    const handleVoiceClick = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            toast({ title: "Not Supported", description: "Voice input is not supported in this browser." });
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListening(true);
            toast({ title: "Listening...", description: "Speak now.", duration: 3000 });
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(prev => prev ? prev + " " + transcript : transcript);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognition.start();
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
                        <div className="flex items-center gap-1.5 mr-3 border-r border-[--border] pr-3">
                            <button
                                onClick={() => setActiveTone(t => t === "Formal" ? null : "Formal")}
                                className={cn(
                                    "px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold rounded-md transition-colors",
                                    activeTone === "Formal" ? "bg-[--text-primary] text-[--bg-primary]" : "text-[--text-muted] hover:bg-[--bg-hover] hover:text-[--text-primary]"
                                )}
                            >
                                Formal
                            </button>
                            <button
                                onClick={() => setActiveTone(t => t === "Informal" ? null : "Informal")}
                                className={cn(
                                    "px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold rounded-md transition-colors",
                                    activeTone === "Informal" ? "bg-[--text-primary] text-[--bg-primary]" : "text-[--text-muted] hover:bg-[--bg-hover] hover:text-[--text-primary]"
                                )}
                            >
                                Informal
                            </button>
                            <button
                                onClick={() => setActiveTone(t => t === "Casual" ? null : "Casual")}
                                className={cn(
                                    "px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold rounded-md transition-colors",
                                    activeTone === "Casual" ? "bg-[--text-primary] text-[--bg-primary]" : "text-[--text-muted] hover:bg-[--bg-hover] hover:text-[--text-primary]"
                                )}
                            >
                                Casual
                            </button>
                        </div>

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
                            className={cn(
                                "p-2 rounded-lg transition-colors relative",
                                isListening ? "text-red-500 bg-red-500/10" : "text-[--text-muted] hover:bg-[--bg-hover] hover:text-[--text-primary]"
                            )}
                            onClick={handleVoiceClick}
                            title="Voice Input"
                        >
                            <Mic className="w-4 h-4" strokeWidth={2.5} />
                            {isListening && (
                                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                            )}
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
