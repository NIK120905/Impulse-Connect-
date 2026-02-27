"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const mockConnections: any[] = [];

export default function ConnectionsPanel() {
    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex flex-col p-4 pb-2 shrink-0">
                <h2 className="text-xl font-semibold mb-1">Connections</h2>
                <p className="text-[13px] text-[--text-muted] leading-tight">
                    Connect your platforms to analyze messages before sending
                </p>
            </div>

            <ScrollArea className="flex-1 w-full px-2">
                <div className="flex flex-col gap-2 pb-6 px-2 mt-2">
                    {mockConnections.map((conn) => (
                        <div
                            key={conn.id}
                            className="group rounded-xl border border-[--border] p-3 transition-colors hover:border-[--text-muted] bg-[--bg-card]"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg leading-none">{conn.icon}</span>
                                    <span className="font-semibold text-[15px]">{conn.platform}</span>
                                </div>
                                <Badge variant="secondary" className="bg-[--bg-hover] text-[--text-muted] text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border-none pointer-events-none">
                                    {conn.status}
                                </Badge>
                            </div>
                            <p className="text-xs text-[--text-muted] mb-3">{conn.description}</p>
                            <Button variant="outline" size="sm" className="w-full h-8 text-xs border-[--border] text-[--text-secondary] hover:text-[--text-primary]">
                                Connect
                            </Button>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
