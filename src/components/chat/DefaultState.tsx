"use client";

import { motion } from "framer-motion";

export default function DefaultState() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 w-full flex flex-col items-center justify-center p-6 text-center mt-[-40px] relative overflow-hidden"
        >
            {/* Smooth background gradient effect matching the reference image's glow */}
            <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-blue-500/15 via-purple-500/5 to-transparent blur-3xl opacity-100 dark:opacity-70 pointer-events-none -z-10" />

            <div className="w-12 h-12 bg-white border border-[#E5E5E5] rounded-xl flex items-center justify-center mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:bg-[--bg-card] dark:border-[--border] z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C12 2 12 7.5 17 8C17 8 12 8.5 12 14C12 14 12 8.5 7 8C7 8 12 7.5 12 2Z" fill="#3B82F6" stroke="#3B82F6" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M18 14C18 14 18 16.5 20.5 17C20.5 17 18 17.5 18 20C18 20 18 17.5 15.5 17C15.5 17 18 16.5 18 14Z" fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M6 14C6 14 6 15.5 7.5 16C7.5 16 6 16.5 6 18C6 18 6 16.5 4.5 16C4.5 16 6 15.5 6 14Z" fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
            </div>

            <h1 className="text-[32px] font-semibold mb-1 text-[--text-primary] z-10">Hey, I'm Impulse Control.</h1>
            <h2 className="text-[20px] text-[#A1A1AA] font-medium tracking-tight z-10">How can I help you today?</h2>
        </motion.div>
    );
}
