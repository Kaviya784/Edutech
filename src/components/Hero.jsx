import React, { useState, useEffect } from 'react';
import { Play, Users, BookOpen, Award } from 'lucide-react';

export default function Hero() {

    // useEffect — runs once when the Hero component first appears on screen.
    //    It simulates an animated counter for learner/course counts.
    const [count, setCount] = useState({ learners: 0, courses: 0, mentors: 0 });

    useEffect(() => {
        // Targets to count up to
        const target = { learners: 12000, courses: 450, mentors: 80 };
        const steps = 60;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            setCount({
                learners: Math.floor((target.learners / steps) * step),
                courses: Math.floor((target.courses / steps) * step),
                mentors: Math.floor((target.mentors / steps) * step),
            });

            if (step >= steps) clearInterval(timer); // stop when done
        }, 25);

        // Cleanup: stop timer if component unmounts
        return () => clearInterval(timer);
    }, []); // [] means: run ONLY once on mount

    return (
        <section className="bg-slate-900 py-24 px-6 border-b border-slate-800">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-500 text-xs font-bold uppercase tracking-widest mb-6">
                        New Platform Launch 🚀
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1]">
                        Unlock Your <br />
                        <span className="text-blue-600">Potential.</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
                        Join thousands of students learning the most in-demand tech and design skills from world-class professionals.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button
                            onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-600/20 transition-all active:scale-95"
                        >
                            Explore Courses
                        </button>
                        <button className="bg-slate-800 hover:bg-slate-700 text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
                            <Play size={20} fill="currentColor" /> Watch Video
                        </button>
                    </div>

                    {/* Animated Stats Row */}
                    <div className="mt-14 grid grid-cols-3 gap-6 border-t border-slate-800 pt-10">
                        <div>
                            <p className="text-3xl font-extrabold text-white">{count.learners.toLocaleString()}+</p>
                            <p className="text-slate-500 text-sm mt-1 flex items-center gap-1"><Users size={14} /> Learners</p>
                        </div>
                        <div>
                            <p className="text-3xl font-extrabold text-white">{count.courses}+</p>
                            <p className="text-slate-500 text-sm mt-1 flex items-center gap-1"><BookOpen size={14} /> Courses</p>
                        </div>
                        <div>
                            <p className="text-3xl font-extrabold text-white">{count.mentors}+</p>
                            <p className="text-slate-500 text-sm mt-1 flex items-center gap-1"><Award size={14} /> Mentors</p>
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="flex-1 w-full relative">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl"></div>
                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-2 border-slate-800 rotate-2 hover:rotate-0 transition-transform duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
                            alt="Students learning"
                            className="w-full h-auto"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
