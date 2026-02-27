import { createClient } from './supabase/client';
import type { Chat } from './types';

function getSupabase() {
    return createClient();
}

export async function createNewChat(title: string = 'New Chat') {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
        .from('chats')
        .insert([
            {
                user_id: user.id,
                title: title || `Chat ${new Date().toLocaleDateString()}`,
            }
        ])
        .select('*');

    if (error) {
        console.error('Error creating chat:', error);
        throw error;
    }

    // Map to frontend Chat type
    return {
        id: data[0].id,
        title: data[0].title,
        dateGroup: 'TODAY',
        colorDot: 'bg-zinc-500', // Default mock colors
        timestampStr: 'Just now',
        messages: []
    } as Chat;
}

export async function fetchUserChats(): Promise<Chat[]> {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
        .from('chats')
        .select('*, messages(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching chats:', error);
        throw error;
    }

    return data.map((chat: any) => ({
        id: chat.id,
        title: chat.title,
        dateGroup: 'TODAY',
        colorDot: 'bg-zinc-500',
        timestampStr: new Date(chat.created_at).toLocaleDateString(),
        messages: (chat.messages || []).map((msg: any) => ({
            id: msg.id,
            role: msg.role === 'assistant' ? 'ai' : msg.role,
            content: msg.content,
            analysis: msg.analysis,
            timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })).sort((a: any, b: any) => new Date(`1970/01/01 ${a.timestamp}`).getTime() - new Date(`1970/01/01 ${b.timestamp}`).getTime())
    }));
}

export async function updateChatTitle(chatId: string, newTitle: string) {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
        .from('chats')
        .update({
            title: newTitle,
        })
        .eq('id', chatId)
        .eq('user_id', user.id)
        .select('*');

    if (error) {
        console.error('Error updating chat title:', error);
        throw error;
    }

    return data[0];
}

export async function deleteChatRecord(chatId: string) {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const { error } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId)
        .eq('user_id', user.id);

    if (error) {
        console.error('Error deleting chat:', error);
        throw error;
    }
}

export async function addMessageRecord(chatId: string, content: string, role: 'user' | 'assistant' | 'system', analysis?: any) {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
        .from('messages')
        .insert([
            {
                chat_id: chatId,
                user_id: user.id,
                content,
                role,
                analysis,
            }
        ])
        .select('*');

    if (error) {
        console.error('Error adding message:', error);
        throw error;
    }

    return data[0];
}
