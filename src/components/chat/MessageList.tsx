"use client";

import { Message } from "@/lib/types";
import MessageBubble from "./MessageBubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";

export default function MessageList({ messages }: { messages: Message[] }) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <ScrollArea className="flex-1 w-full flex flex-col px-4 md:px-8 lg:px-16 xl:px-32 max-w-5xl mx-auto pt-6 pb-4">
            <div className="flex flex-col gap-4 pb-24 min-h-full justify-end">
                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                ))}
                <div ref={bottomRef} className="h-4 shrink-0" />
            </div>
        </ScrollArea>
    );
}
