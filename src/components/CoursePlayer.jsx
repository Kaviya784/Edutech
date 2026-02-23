import React, { useState } from 'react';
import { ArrowLeft, PlayCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CoursePlayer({ course }) {
    const { selectCourse } = useApp();
    const [activeModule, setActiveModule] = useState(course.modules[0].id);

    return (
        <div className="bg-slate-900 min-h-screen text-white p-6">
            <div className="max-w-6xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => selectCourse(null)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Courses
                </button>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Main Player Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-black aspect-video rounded-2xl flex items-center justify-center border border-slate-800 shadow-2xl">
                            <div className="text-center">
                                <PlayCircle size={64} className="text-blue-600 mx-auto mb-4" />
                                <p className="text-slate-500">Video Player Simulation</p>
                                <p className="text-sm">Lesson: {course.modules.find(m => m.id === activeModule)?.title}</p>
                            </div>
                        </div>

                        <div className="bg-slate-800 p-8 rounded-2xl">
                            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                            <p className="text-slate-400">
                                In this course, you will learn the fundamentals and advanced concepts of {course.title}.
                                Follow along with each module to master the skill.
                            </p>
                        </div>
                    </div>

                    {/* Module Sidebar */}
                    <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 h-fit">
                        <div className="p-6 bg-slate-700 font-bold border-b border-slate-600">
                            Course Content
                        </div>
                        <div className="p-4 space-y-2">
                            {course.modules.map((mod, index) => (
                                <button
                                    key={mod.id}
                                    onClick={() => setActiveModule(mod.id)}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${activeModule === mod.id
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'hover:bg-slate-700 text-slate-400'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs opacity-50">{index + 1}.</span>
                                        <span className="font-medium text-sm">{mod.title}</span>
                                    </div>
                                    {activeModule === mod.id && <CheckCircle size={16} />}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
