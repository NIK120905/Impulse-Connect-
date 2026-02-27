CREATE TABLE IF NOT EXISTS chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_archived BOOLEAN DEFAULT FALSE,
  CONSTRAINT unique_chat_per_user UNIQUE(user_id, id)
);

CREATE INDEX idx_chats_user_id ON chats(user_id);
CREATE INDEX idx_chats_created_at ON chats(created_at DESC);

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  content TEXT NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_chat_id ON chat_messages(chat_id);
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at DESC);

-- Enable RLS on chats table
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;

-- Policy: Users can SELECT only their own chats
CREATE POLICY "Users can view their own chats" ON chats
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can INSERT only for themselves
CREATE POLICY "Users can create their own chats" ON chats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can UPDATE only their own chats
CREATE POLICY "Users can update their own chats" ON chats
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can DELETE only their own chats
CREATE POLICY "Users can delete their own chats" ON chats
  FOR DELETE USING (auth.uid() = user_id);

-- Apply similar RLS to chat_messages table
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages in their chats" ON chat_messages
  FOR SELECT USING (chat_id IN (SELECT id FROM chats WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert messages in their chats" ON chat_messages
  FOR INSERT WITH CHECK (chat_id IN (SELECT id FROM chats WHERE user_id = auth.uid()));
