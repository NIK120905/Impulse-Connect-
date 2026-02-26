import { create } from 'zustand';
import { Chat, Message, ToastMessage } from '@/lib/types';
import { initialChats } from '@/lib/mockData';

export type PanelType = 'chats' | 'projects' | 'connections' | 'settings' | 'profile';

interface AppStore {
    // UI State
    activePanel: PanelType;
    setActivePanel: (panel: PanelType) => void;

    isPanelOpen: boolean;
    togglePanel: () => void;
    setPanelOpen: (isOpen: boolean) => void;

    // Chat State  
    activeChatId: string | null;
    setActiveChatId: (id: string | null) => void;
    chats: Chat[];
    addMessage: (chatId: string, message: Message) => void;
    createNewChat: () => string;
    updateChatTitle: (chatId: string, newTitle: string) => void;
    deleteChat: (chatId: string) => void;
    clearAllChats: () => void;

    // Toast
    toasts: ToastMessage[];
    addToast: (toast: Omit<ToastMessage, 'id'>) => void;
    removeToast: (id: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
    activePanel: 'chats',
    setActivePanel: (panel) => set({ activePanel: panel, isPanelOpen: true }),

    isPanelOpen: true,
    togglePanel: () => set((state) => ({ isPanelOpen: !state.isPanelOpen })),
    setPanelOpen: (isOpen) => set({ isPanelOpen: isOpen }),

    activeChatId: '1', // pre-select mock chat
    setActiveChatId: (id) => set({ activeChatId: id }),
    chats: initialChats,

    addMessage: (chatId, message) => set((state) => ({
        chats: state.chats.map((chat) =>
            chat.id === chatId
                ? { ...chat, messages: [...chat.messages, message] }
                : chat
        )
    })),

    createNewChat: () => {
        const newId = Date.now().toString();
        const newChat: Chat = {
            id: newId,
            title: 'New Chat',
            dateGroup: 'TODAY',
            colorDot: 'bg-zinc-500',
            timestampStr: 'Just now',
            messages: []
        };

        set((state) => ({
            chats: [newChat, ...state.chats],
            activeChatId: newId,
            activePanel: 'chats',
            isPanelOpen: true
        }));

        return newId;
    },

    updateChatTitle: (chatId, newTitle) => set((state) => ({
        chats: state.chats.map(chat =>
            chat.id === chatId ? { ...chat, title: newTitle } : chat
        )
    })),

    deleteChat: (chatId) => set((state) => ({
        chats: state.chats.filter(c => c.id !== chatId),
        activeChatId: state.activeChatId === chatId ? null : state.activeChatId
    })),

    clearAllChats: () => set({ chats: [], activeChatId: null })

    // Toasts will be handled by shadcn's use-toast hook
}));
