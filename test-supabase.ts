import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY! || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
    console.log('Testing Supabase Connection...');

    // 1. Check if the table exists by doing a small query
    const { data: chats, error: chatsError } = await supabase
        .from('chats')
        .select('id, title')
        .limit(1);

    if (chatsError) {
        console.error('Error querying chats table:', chatsError);
    } else {
        console.log('Successfully queried chats table. Data:', chats);
    }

    // 2. Check chat_messages table
    const { data: msgs, error: msgsError } = await supabase
        .from('chat_messages')
        .select('id, content')
        .limit(1);

    if (msgsError) {
        console.error('Error querying chat_messages table:', msgsError);
    } else {
        console.log('Successfully queried chat_messages table. Data:', msgs);
    }
}

testSupabase().catch(console.error);
