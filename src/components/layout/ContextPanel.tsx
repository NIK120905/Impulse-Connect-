"use client";

import { useAppStore } from "@/store/appStore";
import { motion } from "framer-motion";
import ChatsPanel from "@/components/panels/ChatsPanel";
import ProjectsPanel from "@/components/panels/ProjectsPanel";
import ConnectionsPanel from "@/components/panels/ConnectionsPanel";
import SettingsPanel from "@/components/panels/SettingsPanel";
import ProfilePanel from "@/components/panels/ProfilePanel";

export default function ContextPanel() {
    const activePanel = useAppStore((state) => state.activePanel);

    const renderPanel = () => {
        switch (activePanel) {
            case "chats": return <ChatsPanel />;
            case "projects": return <ProjectsPanel />;
            case "connections": return <ConnectionsPanel />;
            case "settings": return <SettingsPanel />;
            case "profile": return <ProfilePanel />;
            default: return <ChatsPanel />;
        }
    };

    return (
        <motion.div
            initial={{ x: -260, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -260, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full w-[260px] border-r border-[--border] bg-[--bg-secondary] shrink-0 z-10 overflow-hidden"
        >
            {renderPanel()}
        </motion.div>
    );
}
