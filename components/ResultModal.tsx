import React, { useEffect } from 'react';

interface ResultModalProps {
    isCorrect: boolean;
    explanation: string;
    onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ isCorrect, explanation, onClose }) => {
    useEffect(() => {
        // Allow closing incorrect answer modal with Enter or Escape
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isCorrect && (event.key === 'Enter' || event.key === 'Escape')) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isCorrect, onClose]);

    const bgColor = isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500';
    const textColor = isCorrect ? 'text-green-700' : 'text-red-700';
    
    const Icon = isCorrect ? (
        <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    ) : (
        <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    );

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="result-modal-title"
        >
            <div 
                className={`relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center border-t-8 ${bgColor}`}
                onClick={e => e.stopPropagation()}
            >
                <div className="mx-auto mb-4">
                    {Icon}
                </div>
                <h2 id="result-modal-title" className={`text-2xl font-bold mb-2 ${textColor}`}>{isCorrect ? '정답입니다!' : '오답입니다'}</h2>
                <p className="text-slate-600 mb-6">{isCorrect ? '훌륭해요! 다음 단계로 이동합니다.' : explanation}</p>
                {!isCorrect && (
                    <button
                        onClick={onClose}
                        className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        autoFocus
                    >
                        다시 시도하기
                    </button>
                )}
            </div>
        </div>
    );
};

export default ResultModal;
