import React, { useState, useMemo } from 'react';
import { courses } from '../data/courses';
import { Star, Clock, ArrowRight } from 'lucide-react';

export default function CourseList() {
    const [activeTab, setActiveTab] = useState('All');

    // useMemo — the filtered list is only recalculated when `activeTab` changes.
    //    Without useMemo, it would recalculate on every single render, even
    //    if nothing changed. It "remembers" the last result.
    const filteredCourses = useMemo(() => {
        console.log('Filtering courses for tab:', activeTab); // Run this to see when it fires
        if (activeTab === 'All') return courses;
        return courses.filter(course => course.category === activeTab);
    }, [activeTab]); // only re-run when activeTab changes

    return (
        <div className="bg-slate-900 px-6 py-20" id="courses">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Our Popular Courses</h2>
                    <p className="text-slate-400">Choose from hundreds of courses designed by industry experts.</p>
                </div>

                {/* Category Tabs */}
                <div className="flex justify-center gap-4 mb-12">
                    {['All', 'Development', 'Design'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-8 py-2.5 rounded-full font-semibold transition-all ${activeTab === cat
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Course Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map(course => (
                        <div
                            key={course.id}
                            className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-xl group hover:border-blue-500/50 transition-all duration-300"
                        >
                            <div className="relative">
                                <img src={course.image} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" alt={course.title} />
                                <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                    {course.category}
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex items-center gap-1 text-yellow-500 mb-4">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-sm font-bold text-white">{course.rating}</span>
                                    <span className="text-slate-500 text-xs ml-1">({course.enrolled} joined)</span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-6 leading-snug">
                                    {course.title}
                                </h3>

                                <div className="flex justify-between items-center pt-6 border-t border-slate-700/50 text-slate-400">
                                    <div className="flex items-center gap-2 text-xs">
                                        <Clock size={14} /> 12+ Lessons
                                    </div>
                                    <button className="text-blue-500 hover:text-blue-400 flex items-center gap-2 text-sm font-bold transition-colors">
                                        View Details <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="bg-slate-800 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-700 transition-all border border-slate-700">
                        View All 100+ Courses
                    </button>
                </div>
            </div>
        </div>
    );
}
