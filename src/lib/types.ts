export interface Message {
    id: string;
    role: 'user' | 'ai';
    content: string;
    timestamp: string;
    analysis?: AIAnalysis;
}

export interface AIAnalysis {
    score: number;
    flaggedPhrases: string[];
    rewrite: string;
}

export interface Chat {
    id: string;
    title: string;
    dateGroup: 'TODAY' | 'YESTERDAY' | 'THIS WEEK' | 'EARLIER';
    colorDot: string;
    timestampStr: string;
    messages: Message[];
}

export interface Project {
    id: string;
    name: string;
    emoji: string;
    chatCount: number;
    updatedStr: string;
    chats: Chat[];
}

export interface Connection {
    id: string;
    platform: string;
    description: string;
    icon: string;
    status: 'Connected' | 'Coming Soon';
}

export interface ToastMessage {
    id: string;
    title: string;
    description?: string;
}
