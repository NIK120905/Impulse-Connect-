"use client";

import dynamic from "next/dynamic";
import { useAppStore } from "@/store/appStore";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Lazy load layout components for performance
const IconRail = dynamic(() => import("@/components/layout/IconRail"), { ssr: false });
const ContextPanel = dynamic(() => import("@/components/layout/ContextPanel"), { ssr: false });
const ChatArea = dynamic(() => import("@/components/layout/ChatArea"), { ssr: false });
const MobileNav = dynamic(() => import("@/components/layout/MobileNav"), { ssr: false });
const MobileDrawer = dynamic(() => import("@/components/layout/MobileDrawer"), { ssr: false });

export default function Home() {
  const isPanelOpen = useAppStore((state) => state.isPanelOpen);
  const [isMobile, setIsMobile] = useState(false);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[--background] text-[--foreground] focus:outline-none focus:ring-0 outline-none">
      {!isMobile && <IconRail />}
      {!isMobile && (
        <AnimatePresence>
          {isPanelOpen && <ContextPanel />}
        </AnimatePresence>
      )}

      {isMobile && <MobileDrawer />}

      <ChatArea />

      {isMobile && <MobileNav />}
    </div>
  );
}
