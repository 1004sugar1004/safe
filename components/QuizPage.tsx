import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizPageProps {
    question: QuizQuestion;
    onSubmit: (selectedIndex: number) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ question, onSubmit }) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const handleSubmit = () => {
        if (selectedOption !== null) {
            onSubmit(selectedOption);
        }
    };

    return (
        <div className="animate-fade-in flex flex-col justify-center h-full">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                 <h2 className="text-xl md:text-2xl font-bold text-slate-800">{question.question}</h2>
            </div>
            <div className="space-y-4">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedOption(index)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                            selectedOption === index 
                                ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-300' 
                                : 'bg-white border-slate-300 hover:bg-slate-100 hover:border-slate-400'
                        }`}
                    >
                        <span className="font-semibold text-slate-700">{option}</span>
                    </button>
                ))}
            </div>
            <div className="mt-8 text-center">
                <button
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                    className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    정답 확인
                </button>
            </div>
        </div>
    );
};

export default QuizPage;