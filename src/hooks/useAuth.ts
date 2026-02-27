import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient();

        // Check for active session on mount
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    return { user, loading };
}
