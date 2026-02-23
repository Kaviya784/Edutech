import React, { useState, useMemo } from 'react';
import { CheckCircle2, Circle, Trophy, ArrowRight, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
    {
        id: 1,
        question: "What is the primary purpose of the useMemo hook?",
        options: [
            "To handle side effects in functional components",
            "To memoize expensive calculations and optimize performance",
            "To manage global state in a React application",
            "To create references to DOM elements"
        ],
        correct: 1
    },
    {
        id: 2,
        question: "Which of these is NOT a rule of React Hooks?",
        options: [
            "Only call hooks at the top level",
            "Only call hooks from React functions",
            "Hooks can be called inside loops or conditions",
            "Custom hooks must start with 'use'"
        ],
        correct: 2
    }
];

export default function Quiz() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    const score = useMemo(() => {
        return Object.entries(answers).reduce((acc, [idx, answer]) => {
            return questions[idx].correct === answer ? acc + 1 : acc;
        }, 0);
    }, [answers]);

    const handleSelect = (optionIdx) => {
        setAnswers(prev => ({ ...prev, [currentStep]: optionIdx }));
    };

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    const reset = () => {
        setAnswers({});
        setCurrentStep(0);
        setIsFinished(false);
    };

    if (isFinished) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 rounded-[2.5rem] text-center max-w-2xl mx-auto"
            >
                <div className="w-20 h-20 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <Trophy size={40} />
                </div>
                <h2 className="text-4xl font-bold mb-4">Quiz Completed!</h2>
                <p className="text-slate-400 text-lg mb-8">
                    You scored <span className="text-white font-bold">{score}</span> out of <span className="text-white font-bold">{questions.length}</span>
                </p>
                <div className="flex gap-4 justify-center">
                    <button onClick={reset} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors font-bold">
                        <RefreshCcw size={18} /> Retake
                    </button>
                    <button className="bg-brand-500 px-8 py-3 rounded-xl font-bold glow-primary">
                        Claim Certificate
                    </button>
                </div>
            </motion.div>
        );
    }

    const q = questions[currentStep];

    return (
        <div className="max-w-2xl mx-auto py-12">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <span className="text-brand-400 font-bold tracking-widest text-xs uppercase">Knowledge Check</span>
                    <h2 className="text-3xl font-bold">Quick Quiz</h2>
                </div>
                <div className="text-right">
                    <span className="text-slate-500 text-sm font-bold">{currentStep + 1} of {questions.length}</span>
                    <div className="w-32 h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-brand-500 transition-all duration-500" style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}></div>
                    </div>
                </div>
            </div>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                >
                    <p className="text-xl font-medium leading-relaxed mb-8">{q.question}</p>
                    <div className="space-y-3">
                        {q.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSelect(idx)}
                                className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all text-left ${answers[currentStep] === idx
                                        ? 'bg-brand-500/10 border-brand-500 text-white shadow-lg'
                                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 text-slate-400'
                                    }`}
                            >
                                {answers[currentStep] === idx ? <CheckCircle2 size={24} className="text-brand-500" /> : <Circle size={24} />}
                                <span className="font-semibold">{opt}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex justify-end">
                <button
                    onClick={handleNext}
                    disabled={answers[currentStep] === undefined}
                    className="flex items-center gap-2 bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-10 rounded-2xl transition-all glow-primary"
                >
                    {currentStep === questions.length - 1 ? 'Finish' : 'Next Question'} <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
}
