import { create } from 'zustand';
import { Chat, Message, ToastMessage } from '@/lib/types';
import {
    createNewChat,
    fetchUserChats,
    updateChatTitle,
    deleteChatRecord,
    addMessageRecord
} from '@/lib/chatService';

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
    setChats: (chats: Chat[]) => void;
    loadChats: () => Promise<void>;
    addMessage: (chatId: string, message: Message) => Promise<void>;
    createNewChat: (initialMessage?: string) => Promise<string>;
    updateChatTitle: (chatId: string, newTitle: string) => Promise<void>;
    deleteChat: (chatId: string) => Promise<void>;
    clearAllChats: () => void;

}

export const useAppStore = create<AppStore>((set, get) => ({
    activePanel: 'chats',
    setActivePanel: (panel) => set({ activePanel: panel, isPanelOpen: true }),

    isPanelOpen: true,
    togglePanel: () => set((state) => ({ isPanelOpen: !state.isPanelOpen })),
    setPanelOpen: (isOpen) => set({ isPanelOpen: isOpen }),

    activeChatId: null,
    setActiveChatId: (id) => set({ activeChatId: id }),
    chats: [],
    setChats: (chats) => set({ chats }),

    loadChats: async () => {
        try {
            const userChats = await fetchUserChats();
            set({ chats: userChats });
        } catch (error) {
            console.error('Failed to load chats:', error);
        }
    },

    addMessage: async (chatId, message) => {
        // Optimistic update
        set((state) => ({
            chats: state.chats.map((chat) =>
                chat.id === chatId
                    ? { ...chat, messages: [...chat.messages, message] }
                    : chat
            )
        }));

        // Persist to Supabase
        try {
            const role = message.role === 'ai' ? 'assistant' : 'user';
            await addMessageRecord(chatId, message.content, role as any, message.analysis);
        } catch (error) {
            console.error('Failed to save message:', error);
            // Optionally rollback optimistic update
        }
    },

    createNewChat: async (initialMessage?: string) => {
        try {
            let title = 'New Chat';
            if (initialMessage) {
                // Generate a simple title from the first few words
                const words = initialMessage.split(' ');
                title = words.slice(0, 5).join(' ');
                if (title.length > 30) {
                    title = title.substring(0, 30).trim() + '...';
                }
            }

            const newChat = await createNewChat(title);
            set((state) => ({
                chats: [newChat, ...state.chats],
                activeChatId: newChat.id,
                activePanel: 'chats',
                isPanelOpen: true
            }));
            return newChat.id;
        } catch (error) {
            console.error('Failed to create chat:', error);
            return '';
        }
    },

    updateChatTitle: async (chatId, newTitle) => {
        // Optimistic update
        set((state) => ({
            chats: state.chats.map(chat =>
                chat.id === chatId ? { ...chat, title: newTitle } : chat
            )
        }));

        try {
            await updateChatTitle(chatId, newTitle);
        } catch (error) {
            console.error('Failed to update chat title:', error);
        }
    },

    deleteChat: async (chatId) => {
        // Optimistic update
        set((state) => ({
            chats: state.chats.filter(c => c.id !== chatId),
            activeChatId: state.activeChatId === chatId ? null : state.activeChatId
        }));

        try {
            await deleteChatRecord(chatId);
        } catch (error) {
            console.error('Failed to delete chat:', error);
        }
    },

    clearAllChats: () => set({ chats: [], activeChatId: null })
}));
