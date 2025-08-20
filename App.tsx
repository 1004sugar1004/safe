import React, { useState, useCallback, useMemo } from 'react';
import { courseData } from './constants';
import { CourseStep, QuizQuestion } from './types';
import ContentPage from './components/ContentPage';
import QuizPage from './components/QuizPage';
import PledgePage from './components/PledgePage';
import ProgressBar from './components/ProgressBar';
import ResultModal from './components/ResultModal';
import WelcomePage from './components/WelcomePage';

const App: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(-1); // -1 for welcome screen
    const [showModal, setShowModal] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    
    const totalSteps = courseData.length;

    const handleStart = () => {
        setCurrentStep(0);
    };
    
    const handleNext = useCallback(() => {
        setShowModal(false);
        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
        }
    }, [currentStep, totalSteps]);

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleQuizSubmit = (selectedIndex: number) => {
        const currentQuestion = courseData[currentStep] as QuizQuestion;
        const correct = selectedIndex === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        setShowModal(true);

        if (correct) {
            // If correct, automatically move to the next step after a delay
            setTimeout(() => {
                handleNext();
            }, 1500);
        }
        // If incorrect, the modal will be displayed, and the user must manually close it to try again.
    };
    
    const handleModalClose = () => {
        setShowModal(false);
    };

    const currentContent: CourseStep | undefined = useMemo(() => courseData[currentStep], [currentStep]);

    const renderContent = () => {
        if (currentStep === -1) {
            return <WelcomePage onStart={handleStart} />;
        }
        
        if (currentStep >= totalSteps) {
            return <PledgePage />;
        }

        if (currentContent) {
            if (currentContent.type === 'content') {
                return <ContentPage {...currentContent} />;
            }
            if (currentContent.type === 'quiz') {
                return <QuizPage question={currentContent} onSubmit={handleQuizSubmit} />;
            }
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #e2e8f0, #f8fafc)' }}>
            <div className="w-full max-w-4xl mx-auto">
                <header className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">증평 글로벌 그린리더</h1>
                    <p className="text-lg md:text-xl font-medium text-slate-600 mt-2">국외프로그램 안전교육</p>
                </header>
                
                {currentStep > -1 && (
                    <ProgressBar current={currentStep} total={totalSteps} />
                )}

                <main className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 min-h-[500px] flex flex-col justify-between transition-all duration-500">
                    {renderContent()}

                    {currentStep > -1 && currentStep < totalSteps && (
                        <div className="flex justify-between items-center mt-8">
                            <button 
                                onClick={handlePrevious} 
                                disabled={currentStep === 0}
                                className="px-6 py-2 bg-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                이전
                            </button>
                            {currentContent?.type === 'content' && (
                                <button 
                                    onClick={handleNext}
                                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                                    다음
                                </button>
                            )}
                        </div>
                    )}
                </main>
                <footer className="text-center text-slate-500 mt-6 text-sm">
                    2025 증평 글로벌 그린리더 프로젝트
                </footer>
            </div>
            {showModal && currentContent?.type === 'quiz' && (
                <ResultModal 
                    isCorrect={isCorrect} 
                    onClose={handleModalClose} 
                    explanation={currentContent.explanation} 
                />
            )}
        </div>
    );
};

export default App;