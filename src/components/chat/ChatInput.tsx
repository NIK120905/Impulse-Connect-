"use client";

import { useAppStore } from "@/store/appStore";
import { getMockResponse } from "@/lib/mockResponses";
import { useState, useRef, useEffect } from "react";
import { Mic, Paperclip, Send, FileText, SlidersHorizontal, Pause, Check, Play, Square, X, ArrowUp, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export default function ChatInput() {
    const { activeChatId, addMessage, createNewChat } = useAppStore();
    const [input, setInput] = useState("");
    const [activeTone, setActiveTone] = useState<"Formal" | "Informal" | "Casual" | null>(null);
    const { toast } = useToast();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Voice states
    const [voiceState, setVoiceState] = useState<"idle" | "recording" | "paused" | "processing" | "complete">("idle");
    const [recordingTime, setRecordingTime] = useState(0);
    const [bars, setBars] = useState<number[]>(Array(40).fill(4));

    const recognitionRef = useRef<any>(null);
    const existingInputRef = useRef(input);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [input]);

    useEffect(() => {
        if (voiceState === "recording") {
            timerRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
                setBars(Array(40).fill(0).map(() => Math.floor(Math.random() * 24) + 4));
            }, 100);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
            if (voiceState === "paused" || voiceState === "complete") {
                setBars(prev => prev.map(() => Math.floor(Math.random() * 8) + 4));
            }
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [voiceState]);

    const formatTime = (timeIn100ms: number) => {
        const totalSeconds = Math.floor(timeIn100ms / 10);
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const handleSend = () => {
        if (!input.trim() && voiceState !== "complete") return;

        let chatId = activeChatId;
        if (!chatId) {
            chatId = createNewChat();
        }

        const userMessage = {
            id: `msg_${Date.now()}`,
            role: "user" as const,
            content: input.trim() || "(Voice Message)",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        addMessage(chatId, userMessage);
        setInput("");
        setVoiceState("idle");
        setRecordingTime(0);

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

    const toggleVoiceRecording = () => {
        if (voiceState === "idle" || voiceState === "paused") {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                toast({ title: "Not Supported", description: "Voice input is not supported in this browser." });
                return;
            }

            if (!recognitionRef.current) {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;

                recognition.onstart = () => {
                    setVoiceState("recording");
                    existingInputRef.current = input;
                };

                recognition.onresult = (event: any) => {
                    let interimTranscript = "";
                    let finalTranscript = existingInputRef.current;

                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            finalTranscript += event.results[i][0].transcript;
                        } else {
                            interimTranscript += event.results[i][0].transcript;
                        }
                    }
                    existingInputRef.current = finalTranscript;
                    setInput(finalTranscript + interimTranscript);
                };

                recognition.onerror = () => {
                    setVoiceState(prev => prev === "recording" ? "paused" : prev);
                };

                recognitionRef.current = recognition;
            }

            try {
                if (voiceState === "idle") setRecordingTime(0);
                recognitionRef.current.start();
                setVoiceState("recording");
            } catch (e) {
                // If it's already started, ignore
                setVoiceState("recording");
            }
        } else if (voiceState === "recording") {
            setVoiceState("paused");
            try { recognitionRef.current.stop(); } catch (e) { }
        }
    };

    const stopRecording = () => {
        setVoiceState("processing");
        try { recognitionRef.current.stop(); } catch (e) { }
        setTimeout(() => {
            setVoiceState("complete");
        }, 1200);
    };

    const cancelRecording = () => {
        setVoiceState("idle");
        setRecordingTime(0);
        try { recognitionRef.current.stop(); } catch (e) { }
        // Need to clean up input too? We can just stop recording.
    };

    return (
        <div className="flex flex-col gap-2 w-full pt-2 relative">

            {/* FLOATING VOICE WIDGET */}
            {voiceState !== "idle" && (
                <div className="absolute bottom-[calc(100%+8px)] left-0 right-0 flex justify-center z-50">
                    <div className="bg-[--bg-card] border border-[--border] shadow-lg rounded-full py-2 px-4 flex items-center gap-4 animate-in slide-in-from-bottom-2 fade-in min-w-[320px]">

                        {voiceState === "processing" ? (
                            <div className="flex items-center gap-3 w-full py-1 justify-center">
                                <Loader2 className="w-4 h-4 animate-spin text-[--text-muted]" />
                                <span className="text-sm font-medium text-[--text-secondary]">Generating transcript...</span>
                            </div>
                        ) : voiceState === "complete" ? (
                            <div className="flex items-center gap-4 w-full justify-between">
                                <button className="w-8 h-8 rounded-full bg-[--bg-hover] flex items-center justify-center shrink-0 hover:bg-blue-500/10 hover:text-blue-500 transition-colors">
                                    <Play className="w-4 h-4 fill-current ml-0.5" />
                                </button>

                                <div className="flex items-center gap-0.5 flex-1 h-6">
                                    {bars.slice(0, 30).map((h, i) => (
                                        <div key={i} className="w-1 bg-[--text-muted] rounded-full opacity-50" style={{ height: `${h}px` }} />
                                    ))}
                                </div>

                                <span className="text-xs font-mono font-medium text-[--text-muted] shrink-0">{formatTime(recordingTime)}</span>

                                <button className="w-8 h-8 rounded-full bg-[--text-primary] flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity" onClick={handleSend}>
                                    <ArrowUp className="w-4 h-4 text-[--bg-primary]" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 w-full">
                                {voiceState === "recording" ? (
                                    <button onClick={toggleVoiceRecording} className="w-8 h-8 rounded-full bg-[--bg-hover] flex items-center justify-center shrink-0 text-[--text-primary] hover:bg-[--border] transition-colors border border-[--border] shadow-sm">
                                        <Pause className="w-4 h-4 fill-current" />
                                    </button>
                                ) : (
                                    <button onClick={toggleVoiceRecording} className="w-8 h-8 rounded-full bg-[--text-primary] flex items-center justify-center shrink-0 text-[--bg-primary] hover:opacity-90 transition-opacity border border-[--border] shadow-sm">
                                        <Play className="w-4 h-4 fill-current ml-0.5" />
                                    </button>
                                )}

                                <div className="flex items-center gap-0.5 flex-1 h-8 justify-center">
                                    {bars.map((h, i) => (
                                        <div key={i} className={cn("w-[2.5px] rounded-full transition-all duration-100", voiceState === "recording" ? "bg-[--text-primary]" : "bg-[--text-muted]")} style={{ height: `${Math.max(4, h)}px` }} />
                                    ))}
                                </div>

                                <span className="text-xs font-mono font-medium text-[--text-muted] shrink-0 w-10 text-right">{formatTime(recordingTime)}</span>

                                <button onClick={stopRecording} className="w-8 h-8 rounded-full bg-[--bg-hover] flex items-center justify-center shrink-0 hover:bg-[--border] transition-colors ml-1">
                                    <Square className="w-3 h-3 fill-current text-[--text-secondary]" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div
                className={cn(
                    "bg-[--bg-card] border rounded-2xl shadow-sm transition-colors relative flex flex-col group",
                    input || voiceState !== "idle" ? "border-[--text-muted]" : "border-[--border]"
                )}
            >
                {!input && (
                    <span className="absolute left-4 top-3 text-[--text-muted] pointer-events-none select-none text-[15px]">
                        {voiceState !== "idle" ? "" : "What's on your mind"}
                    </span>
                )}

                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder=" "
                    className="w-full bg-transparent resize-none border-none outline-none py-3 px-4 min-h-[44px] max-h-[120px] text-[15px] leading-relaxed"
                    rows={1}
                />

                <div className="flex items-center justify-between px-3 pb-2 pt-1 border-t border-[--border] mt-auto">
                    <div className="flex items-center gap-1.5 cursor-pointer text-[--text-muted] hover:text-[--text-primary] px-2 py-1 rounded transition-colors group/prompts">
                        <FileText className="w-4 h-4" strokeWidth={2} />
                        <span className="text-xs font-semibold tracking-wide">My Prompts</span>
                    </div>

                    <div className="flex items-center gap-1 relative">
                        {/* Option buttons */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className={cn(
                                        "p-2 rounded-lg transition-colors relative",
                                        activeTone ? "text-[--text-primary] bg-[--bg-hover]" : "text-[--text-muted] hover:bg-[--bg-hover] hover:text-[--text-primary]"
                                    )}
                                    title="Message Tone"
                                >
                                    <SlidersHorizontal className="w-4 h-4" strokeWidth={2.5} />
                                    {activeTone && (
                                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[--text-primary] rounded-full" />
                                    )}
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[140px] bg-[--bg-card] border-[--border] shadow-lg mb-2 z-50">
                                {(["Formal", "Informal", "Casual"] as const).map((tone) => (
                                    <DropdownMenuItem
                                        key={tone}
                                        onClick={() => setActiveTone(t => t === tone ? null : tone)}
                                        className="flex items-center justify-between cursor-pointer focus:bg-[--bg-hover] focus:text-[--text-primary]"
                                    >
                                        <span className="text-sm">{tone}</span>
                                        {activeTone === tone && <Check className="w-3.5 h-3.5 text-[--text-primary]" />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <button
                            className="p-2 text-[--text-muted] hover:bg-[--bg-hover] hover:text-[--text-primary] rounded-lg transition-colors"
                            title="Attach File"
                        >
                            <Paperclip className="w-4 h-4" strokeWidth={2.5} />
                        </button>

                        {voiceState === "complete" && (
                            <button
                                onClick={cancelRecording}
                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Delete Voice Note"
                            >
                                <X className="w-4 h-4" strokeWidth={2.5} />
                            </button>
                        )}

                        <div className="relative">
                            <button
                                className={cn(
                                    "p-2 rounded-lg transition-colors relative",
                                    voiceState === "recording" ? "text-[--bg-primary] bg-[--text-primary]" : "text-[--text-muted] hover:bg-[--bg-hover] hover:text-[--text-primary]"
                                )}
                                onClick={toggleVoiceRecording}
                                title={voiceState === "idle" ? "Start Voice Input" : "Recording Options"}
                            >
                                <Mic className="w-4 h-4" strokeWidth={2.5} />
                                {voiceState === "recording" && (
                                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[--bg-primary] rounded-full animate-pulse" />
                                )}
                            </button>
                        </div>

                        <button
                            onClick={handleSend}
                            disabled={!input.trim() && voiceState !== "complete"}
                            className={cn(
                                "p-2 ml-1 rounded-lg transition-all flex items-center justify-center bg-[--text-primary] text-[--bg-primary]",
                                (!input.trim() && voiceState !== "complete") ? "opacity-30 cursor-not-allowed" : "hover:opacity-90 active:scale-95"
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
