import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, LogOut } from 'lucide-react';

export default function Navbar() {
    const { user, logout, goTo } = useApp();

    return (
        <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">

            {/* Logo — clicking goes to home */}
            <div
                onClick={() => goTo('home')}
                className="flex items-center gap-2 cursor-pointer"
            >
                <div className="bg-blue-600 p-2 rounded-lg">
                    <BookOpen className="text-white" size={20} />
                </div>
                <span className="text-xl font-bold text-white">EduSphere</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8 text-slate-400 font-medium">
                <span onClick={() => goTo('home')} className="hover:text-white cursor-pointer transition-colors">Home</span>
                <a href="#courses" className="hover:text-white transition-colors">Courses</a>
                <a href="#footer" className="hover:text-white transition-colors">About</a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
                {user.isLoggedIn ? (
                    <>
                        <span className="text-slate-400 text-sm hidden sm:block">👋 {user.name}</span>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm transition-all"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => goTo('auth')}
                            className="text-slate-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-all"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => goTo('auth')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all"
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </div>

        </nav>
    );
}
