"use client";

import { useAppStore } from "@/store/appStore";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import { Project } from "@/lib/types";

const mockProjects: Project[] = [];

export default function ProjectsPanel() {
    const { setActiveChatId } = useAppStore();

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex items-center justify-between p-4 shrink-0">
                <h2 className="text-xl font-semibold">Projects</h2>
                <Button variant="outline" size="sm" className="h-7 text-xs px-2 border-[--border] text-[--text-secondary]">
                    New
                </Button>
            </div>

            <ScrollArea className="flex-1 w-full flex flex-col px-4 pb-6">
                <Accordion type="multiple" className="w-full pb-4">
                    {mockProjects.map((project) => (
                        <AccordionItem key={project.id} value={project.id} className="border-b-[--border] mb-2 border-transparent">
                            <AccordionTrigger className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-[--bg-hover] hover:no-underline transition-colors border border-transparent">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{project.emoji}</span>
                                    <div className="flex flex-col items-start gap-0.5">
                                        <span className="text-sm font-medium text-[--text-primary] text-left leading-none">{project.name}</span>
                                        <span className="text-[11px] text-[--text-muted]">Updated {project.updatedStr}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center bg-[--bg-hover] rounded-full w-5 h-5 text-[10px] text-[--text-secondary] mr-2 font-medium">
                                    {project.chatCount}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-1 pb-2">
                                <div className="flex flex-col gap-1 pl-4 pr-2">
                                    <div className="px-3 py-2 text-xs text-[--text-muted] italic">
                                        Placeholder for {project.chatCount} chat{project.chatCount !== 1 && 's'}...
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <button className="w-full mt-2 flex items-center justify-center p-4 border border-dashed border-[--border] rounded-xl text-sm text-[--text-muted] hover:border-[--text-secondary] hover:text-[--text-primary] transition-colors group">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Project
                </button>
            </ScrollArea>
        </div>
    );
}
