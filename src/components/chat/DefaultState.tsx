"use client";

import { MessageSquare, Video, Code, ImageIcon, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function DefaultState() {
    const setInput = (text: string) => {
        // This is a quick hack to update input from default cards. 
        // In a real app we'd lift state or use a store for the input text as well.
        const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
        if (textarea) {
            textarea.value = text;
            // trigger react onChange
            const event = new Event('input', { bubbles: true });
            textarea.dispatchEvent(event);
            textarea.focus();
        }
    };

    const cards = [
        {
            icon: MessageSquare,
            iconColor: "text-amber-500",
            iconBg: "bg-amber-500/10",
            title: "Cold Email Template Expert",
            description: "Helped many people before to create cold email templates for various purposes.",
            prompt: "Can you review my cold email template?"
        },
        {
            icon: Video,
            iconColor: "text-rose-500",
            iconBg: "bg-rose-500/10",
            title: "You Tube Content Writer",
            description: "Helped many people before to create cold email templates for various purposes.",
            prompt: "Draft a script for my YouTube video..."
        },
        {
            icon: Code,
            iconColor: "text-purple-600",
            iconBg: "bg-purple-600/10",
            title: "Pro Coder",
            description: "Helped many people before to create cold email templates for various purposes.",
            prompt: "I need help debugging a function in React."
        },
        {
            icon: ImageIcon,
            iconColor: "text-orange-500",
            iconBg: "bg-orange-500/10",
            title: "Blog Image Generator",
            description: "Helped many people before to create cold email templates for various purposes.",
            prompt: "Generate an image for a blog post..."
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 w-full flex flex-col items-center justify-center p-6 text-center mt-[-40px]"
        >
            <div className="w-12 h-12 bg-white border border-[#E5E5E5] rounded-xl flex items-center justify-center mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:bg-[--bg-card] dark:border-[--border]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C12 2 12 7.5 17 8C17 8 12 8.5 12 14C12 14 12 8.5 7 8C7 8 12 7.5 12 2Z" fill="#3B82F6" stroke="#3B82F6" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M18 14C18 14 18 16.5 20.5 17C20.5 17 18 17.5 18 20C18 20 18 17.5 15.5 17C15.5 17 18 16.5 18 14Z" fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M6 14C6 14 6 15.5 7.5 16C7.5 16 6 16.5 6 18C6 18 6 16.5 4.5 16C4.5 16 6 15.5 6 14Z" fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
            </div>

            <h1 className="text-[32px] font-semibold mb-1 text-[--text-primary]">Hey, I'm TypingMind.</h1>
            <h2 className="text-[20px] text-[#A1A1AA] font-medium mb-10 tracking-tight">How can I help you today?</h2>

            <div className="max-w-[700px] w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[15px] font-semibold text-[--text-primary]">Your AI agents</h3>
                    <button className="text-[13px] text-[--text-primary] font-medium flex items-center hover:opacity-70 transition-opacity">
                        All agents <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            className="cursor-pointer"
                            onClick={() => setInput(card.prompt)}
                        >
                            <Card className="p-4 flex flex-col items-start px-5 text-left bg-white border border-[#E5E5E5]/80 hover:border-[#D4D4D8] hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all rounded-[16px] h-[100px] dark:bg-[--bg-card] dark:border-[--border]">
                                <div className="flex items-center gap-3 mb-1.5 pt-0.5">
                                    <div className={`w-8 h-8 rounded-full ${card.iconBg} flex items-center justify-center shrink-0`}>
                                        <card.icon className={`w-4 h-4 ${card.iconColor}`} />
                                    </div>
                                    <h4 className="font-semibold text-[14px] leading-tight pt-0.5 text-[--text-primary] truncate">{card.title}</h4>
                                </div>
                                <p className="text-[12px] text-[#A1A1AA] leading-[1.4] pl-[44px]">{card.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
