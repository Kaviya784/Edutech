import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Mail, Lock, User, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
    const { login, goTo } = useApp();

    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    // useRef — creates a direct reference to the email <input> DOM element.
    //    We use this to programmatically focus it without triggering a re-render.
    const emailRef = useRef(null);

    // useEffect — runs whenever `isLogin` changes (tab switch).
    //    It automatically moves the cursor into the email field.
    useEffect(() => {
        // Small delay lets the DOM settle before we focus
        const timer = setTimeout(() => {
            if (emailRef.current) {
                emailRef.current.focus();
            }
        }, 100);

        return () => clearTimeout(timer); // cleanup
    }, [isLogin]); // re-runs every time user switches Login <-> Signup

    // useCallback — wraps handleSubmit so it's the same function reference
    //    across renders. Prevents re-creation on every keystroke.
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        if (!isLogin && !name) {
            setError('Please enter your name.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        login(isLogin ? email.split('@')[0] : name);
    }, [email, password, name, isLogin, login]); // only re-make when these change

    const switchTab = (toLogin) => {
        setIsLogin(toLogin);
        setError('');
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-20">
            <div className="w-full max-w-md">

                {/* Back to Home */}
                <button
                    onClick={() => goTo('home')}
                    className="flex items-center gap-2 text-slate-500 hover:text-white mb-10 transition-colors group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </button>

                {/* Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl">

                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-8">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <BookOpen className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold text-white">EduSphere</span>
                    </div>

                    {/* Toggle Login / Signup */}
                    <div className="flex bg-slate-800 rounded-xl p-1 mb-8">
                        <button
                            onClick={() => switchTab(true)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${isLogin ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => switchTab(false)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${!isLogin ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2">
                        {isLogin ? 'Welcome back!' : 'Create your account'}
                    </h2>
                    <p className="text-slate-500 text-sm mb-8">
                        {isLogin
                            ? 'Enter your details to continue learning.'
                            : 'Start your learning journey for free today.'}
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Name — Signup only */}
                        {!isLogin && (
                            <div>
                                <label className="text-slate-400 text-xs font-semibold mb-2 block uppercase tracking-wider">Full Name</label>
                                <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus-within:border-blue-500 transition-colors">
                                    <User size={18} className="text-slate-500" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name"
                                        className="bg-transparent outline-none text-white placeholder-slate-600 text-sm w-full"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email — note: ref attached here */}
                        <div>
                            <label className="text-slate-400 text-xs font-semibold mb-2 block uppercase tracking-wider">Email</label>
                            <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus-within:border-blue-500 transition-colors">
                                <Mail size={18} className="text-slate-500" />
                                <input
                                    ref={emailRef}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="bg-transparent outline-none text-white placeholder-slate-600 text-sm w-full"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-slate-400 text-xs font-semibold mb-2 block uppercase tracking-wider">Password</label>
                            <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus-within:border-blue-500 transition-colors">
                                <Lock size={18} className="text-slate-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="bg-transparent outline-none text-white placeholder-slate-600 text-sm w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-slate-500 hover:text-slate-300"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                                {error}
                            </p>
                        )}

                        {isLogin && (
                            <div className="text-right">
                                <span className="text-blue-500 text-xs hover:underline cursor-pointer">Forgot password?</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-base transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                        >
                            {isLogin ? 'Login to Account' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-slate-500 text-sm text-center mt-8">
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <button
                            onClick={() => switchTab(!isLogin)}
                            className="text-blue-500 hover:underline font-semibold"
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
