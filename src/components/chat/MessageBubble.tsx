"use client";

import { useAppStore } from "@/store/appStore";
import { Copy, Clock, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/lib/types";
import { Separator } from "@/components/ui/separator";

export default function MessageBubble({ message }: { message: Message }) {
    const isUser = message.role === "user";

    return (
        <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex w-full mb-6 ${isUser ? "justify-end" : "justify-start"}`}
        >
            <div className={`flex flex-col max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
                {isUser ? (
                    <div className="bg-[--accent] text-[--accent-fg] rounded-2xl rounded-br-sm px-4 py-3 shadow-sm inline-block">
                        <p className="whitespace-pre-wrap text-[15px]">{message.content}</p>
                    </div>
                ) : (
                    <div className="w-full flex-1">
                        <AIResponse message={message} />
                    </div>
                )}
                <span className="text-[11px] text-[--text-muted] mt-1.5 px-1 inline-block">
                    {message.timestamp}
                </span>
            </div>
        </motion.div>
    );
}

function AIResponse({ message }: { message: Message }) {
    const { toast } = useToast();
    const [typedText, setTypedText] = useState("");
    const contentToType = message.content;
    const analysis = message.analysis;

    // Typewriter effect
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setTypedText(contentToType.substring(0, index + 1));
            index++;
            if (index >= contentToType.length) clearInterval(interval);
        }, 15);
        return () => clearInterval(interval);
    }, [contentToType]);

    const handleCopy = () => {
        if (analysis?.rewrite) {
            navigator.clipboard.writeText(analysis.rewrite);
            toast({
                title: "Copied successfully",
                description: "Rewrite copied to clipboard ✓"
            });
        }
    };

    const handleSend = () => {
        toast({
            title: "Sent original message",
            description: "Original message copied — you're on your own 👀"
        });
    };

    const handleDelay = () => {
        toast({
            title: "Delayed message",
            description: "Reminder set for 2 hours from now ⏱"
        });
    };

    if (!analysis) {
        return (
            <div className="w-full">
                <p className="text-[15px] leading-relaxed">{typedText}</p>
            </div>
        );
    }

    // Determine color based on score (simulating GSAP fill)
    let barColor = "bg-green-500";
    if (analysis.score > 30) barColor = "bg-yellow-500";
    if (analysis.score > 60) barColor = "bg-orange-500";
    if (analysis.score > 80) barColor = "bg-red-500";

    return (
        <div className="w-full max-w-2xl flex flex-col items-start gap-4">
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="w-4 h-4 text-white" />
                </div>
                <p className="text-[15px] leading-relaxed pt-1.5">{typedText}</p>
            </div>

            <AnimatePresence>
                {typedText.length >= contentToType.length && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="w-full bg-[--bg-card] border border-[--border] rounded-xl shadow-sm overflow-hidden mt-2 ml-11 border-l-4 border-l-blue-500/50"
                    >
                        {/* Intensity Score */}
                        <div className="p-4 bg-[--bg-primary]/30">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-sm flex items-center gap-2">
                                    <span className="text-xl">🚨</span> Emotional Intensity
                                </span>
                                <span className="font-bold text-lg">{analysis.score}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-[--bg-hover] overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${analysis.score}%` }}
                                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                                    className={`h-full ${barColor}`}
                                />
                            </div>
                        </div>

                        <Separator className="bg-[--border]/50" />

                        {/* Flagged Phrases */}
                        {analysis.flaggedPhrases && analysis.flaggedPhrases.length > 0 && (
                            <>
                                <div className="p-4 bg-[--bg-primary]/10">
                                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                        <span className="text-xl">⚠️</span> Flagged Phrases
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {analysis.flaggedPhrases.map((phrase, i) => (
                                            <span
                                                key={i}
                                                className="bg-red-500/10 text-red-500 border border-red-500/20 rounded-full px-3 py-1 text-xs font-mono"
                                            >
                                                &quot;{phrase}&quot; &times;
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <Separator className="bg-[--border]/50" />
                            </>
                        )}

                        {/* Suggested Rewrite */}
                        <div className="p-4 bg-[--bg-primary]/10">
                            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                <span className="text-xl">💡</span> Suggested Rewrite
                            </h4>
                            <div className="bg-[--bg-hover] rounded-xl p-3 text-sm italic text-[--text-secondary] leading-relaxed">
                                {analysis.rewrite}
                            </div>
                        </div>

                        <Separator className="bg-[--border]/50" />

                        {/* Actions */}
                        <div className="p-3 bg-[--bg-card] flex flex-wrap gap-2">
                            <Button onClick={handleCopy} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-0">
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Rewrite
                            </Button>
                            <Button onClick={handleSend} variant="outline" size="sm" className="border-[--border]">
                                <Send className="w-4 h-4 mr-2 text-[--text-muted]" />
                                <span className="text-[--text-secondary]">Send Original</span>
                            </Button>
                            <Button onClick={handleDelay} variant="outline" size="sm" className="border-[--border]">
                                <Clock className="w-4 h-4 mr-2 text-[--text-muted]" />
                                <span className="text-[--text-secondary]">Delay 2 Hours</span>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
