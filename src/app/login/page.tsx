'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Chrome, ArrowRight, Loader2, MessageSquareText, Lock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import LiquidEther from '@/components/ui/LiquidEther'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const supabase = createClient()

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            if (isSignUp) {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                        data: {
                            full_name: email.split('@')[0],
                            provider: 'email'
                        }
                    }
                })
                if (signUpError) throw signUpError
                setError("Check your email for the confirmation link.")
            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (signInError) throw signInError

                window.location.href = '/'
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during authentication')
        } finally {
            setIsLoading(false)
        }
    }

    const handleOAuthLogin = async (provider: 'google' | 'github') => {
        setIsLoading(true)
        setError(null)
        try {
            const { error: oauthError } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                }
            })
            if (oauthError) throw oauthError
        } catch (err: any) {
            setError(err.message || `An error occurred with ${provider} login`)
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center p-4 selection:bg-indigo-500/30 overflow-hidden relative">

            <div className="absolute inset-0 z-0">
                <LiquidEther
                    colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="w-16 h-16 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
                    >
                        <MessageSquareText className="w-8 h-8 text-indigo-400" />
                    </motion.div>

                    <h1 className="text-4xl font-semibold text-white tracking-tight mb-2 drop-shadow-md">
                        Welcome to Impulse Control
                    </h1>
                    <p className="text-neutral-300 text-sm">
                        Please sign in to access your intelligent communication assistant.
                    </p>
                </div>

                <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
                    <form onSubmit={handleEmailAuth} className="space-y-5">

                        <div className="space-y-2">
                            <Label className="text-xs font-medium text-neutral-300 ml-1">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 z-10" />
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full bg-black/40 backdrop-blur-sm border-white/10 rounded-xl h-12 pl-10 pr-4 text-sm text-neutral-200 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 transition-all placeholder:text-neutral-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <Label className="text-xs font-medium text-neutral-300">Password</Label>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 z-10" />
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-black/40 backdrop-blur-sm border-white/10 rounded-xl h-12 pl-10 pr-4 text-sm text-neutral-200 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 transition-all placeholder:text-neutral-500"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="py-2"
                            >
                                <div className="text-xs text-red-400 bg-red-950/30 border border-red-500/30 px-3 py-2 rounded-lg backdrop-blur-sm">
                                    {error}
                                </div>
                            </motion.div>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white hover:bg-neutral-200 text-neutral-950 font-medium h-12 rounded-xl text-sm transition-all flex items-center justify-center gap-2 group mt-2"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    {isSignUp ? 'Create Account' : 'Sign In'}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </>
                            )}
                        </Button>

                        <div className="text-center mt-4">
                            <button
                                type="button"
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="text-xs text-neutral-300 hover:text-white transition-colors"
                            >
                                {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                            </button>
                        </div>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px bg-white/10 flex-1" />
                        <span className="text-xs text-neutral-400 font-medium">OR CONTINUE WITH</span>
                        <div className="h-px bg-white/10 flex-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            onClick={() => handleOAuthLogin('google')}
                            disabled={isLoading}
                            className="bg-black/30 hover:bg-black/50 border-white/10 h-11 rounded-xl text-sm text-neutral-300 font-medium transition-all backdrop-blur-sm border hover:text-white"
                        >
                            <Chrome className="w-4 h-4 mr-2" />
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleOAuthLogin('github')}
                            disabled={isLoading}
                            className="bg-black/30 hover:bg-black/50 border-white/10 h-11 rounded-xl text-sm text-neutral-300 font-medium transition-all backdrop-blur-sm border hover:text-white"
                        >
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                        </Button>
                    </div>

                </div>

                <p className="text-center text-xs text-neutral-500 mt-8">
                    Secured by Supabase Auth
                </p>

            </motion.div>
        </div>
    )
}
