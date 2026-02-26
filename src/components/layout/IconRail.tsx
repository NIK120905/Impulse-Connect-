import { cn } from "@/lib/utils";
import {
    MessageSquare,
    FolderOpen,
    Plug2,
    Settings,
    UserCircle,
    Plus,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function IconRail() {
    const {
        activePanel,
        setActivePanel,
        createNewChat,
        isPanelOpen,
        togglePanel
    } = useAppStore();

    const handleNewChat = () => {
        createNewChat();
    };

    const topIcons = [
        { id: "new", icon: Plus, label: "New Chat", action: handleNewChat },
        { id: "toggle", icon: isPanelOpen ? PanelLeftClose : PanelLeftOpen, label: isPanelOpen ? "Close Sidebar" : "Open Sidebar", action: togglePanel },
        { id: "chats", icon: MessageSquare, label: "Chats", action: () => setActivePanel("chats") },
        { id: "projects", icon: FolderOpen, label: "Projects", action: () => setActivePanel("projects") },
        { id: "connections", icon: Plug2, label: "Connections", action: () => setActivePanel("connections") },
    ];

    const bottomIcons = [
        { id: "settings", icon: Settings, label: "Settings", action: () => setActivePanel("settings") },
        { id: "profile", icon: UserCircle, label: "Profile", action: () => setActivePanel("profile") },
    ];

    const iconVariants = {
        hidden: { opacity: 0, y: 8 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.06, ease: "easeOut" }
        })
    };

    return (
        <TooltipProvider delayDuration={150}>
            <aside className="flex h-full w-[64px] flex-col justify-between border-r border-[--border] bg-[--bg-secondary] py-4 items-center shrink-0 z-20">
                <div className="flex flex-col gap-2">
                    {topIcons.map((item, i) => (
                        <Tooltip key={item.id} placement="right">
                            <TooltipTrigger asChild>
                                <motion.button
                                    custom={i}
                                    initial="hidden"
                                    animate="visible"
                                    variants={iconVariants}
                                    onClick={item.action}
                                    className={cn(
                                        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-all duration-150 relative",
                                        (item.id !== "new" && item.id !== "toggle" && activePanel === item.id) || (item.id === "new" && false)
                                            ? "bg-[--bg-active] text-[--text-primary]"
                                            : "text-[--text-muted] hover:bg-[--bg-hover] hover:text-[--text-primary]"
                                    )}
                                    aria-label={item.label}
                                >
                                    <item.icon className="h-[22px] w-[22px]" strokeWidth={2} />
                                </motion.button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={14} className="bg-[--text-primary] text-[--bg-primary] text-xs px-2.5 py-1">
                                {item.label}
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    {bottomIcons.map((item, i) => (
                        <Tooltip key={item.id} placement="right">
                            <TooltipTrigger asChild>
                                <motion.button
                                    custom={i + topIcons.length}
                                    initial="hidden"
                                    animate="visible"
                                    variants={iconVariants}
                                    onClick={item.action}
                                    className={cn(
                                        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-all duration-150",
                                        activePanel === item.id
                                            ? "bg-[--bg-active] text-[--text-primary]"
                                            : "text-[--text-muted] hover:bg-[--bg-hover] hover:text-[--text-primary]"
                                    )}
                                    aria-label={item.label}
                                >
                                    <item.icon className="h-[22px] w-[22px]" strokeWidth={2} />
                                </motion.button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={14} className="bg-[--text-primary] text-[--bg-primary] text-xs px-2.5 py-1">
                                {item.label}
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>
            </aside>
        </TooltipProvider>
    );
}
