import React, { useState } from 'react';

const schools = [
    '증평중',
    '증평여중',
    '형석중',
    '증평초',
    '삼보초',
    '죽리초',
    '도안초'
];

const PledgePage: React.FC = () => {
    const [name, setName] = useState('');
    const [school, setSchool] = useState(schools[0]); // 기본값을 첫 번째 학교로 설정
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            alert('이름을 입력해주세요.');
            return;
        }

        setIsSubmitting(true);
        setStatus('idle');
        
        // Google Apps Script URL for data submission.
        const GOOGLE_SCRIPT_URL: string = 'https://script.google.com/macros/s/AKfycbzuyhCAfNCt79Hf033-SrzVXFnza2khjnXEAqvcc_5HrR9bpOoAJL5TI6qvybXqPQHB/exec';

        try {
            // Google Apps Script has CORS policy, so mode: 'no-cors' might be needed.
            // In this mode, we can't read the response body, but data is sent correctly.
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, school, timestamp: new Date().toISOString() }),
                redirect: 'follow',
            });
            setStatus('success');
        } catch (error) {
            console.error('Error submitting to Google Sheet:', error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // 드롭다운 스타일링을 위한 클래스
    const customSelectWrapper = `relative before:content-[''] before:absolute before:right-4 before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-0 before:border-l-4 before:border-r-4 before:border-t-4 before:border-l-transparent before:border-r-transparent before:border-t-slate-500 before:pointer-events-none`;
    const selectClassName = `shadow appearance-none border border-yellow-300 bg-yellow-50 rounded-lg w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500`;


    return (
        <div className="text-center flex flex-col items-center justify-center h-full animate-fade-in">
            {status === 'success' ? (
                 <div>
                    <svg className="w-20 h-20 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">서약 완료!</h2>
                    <p className="text-slate-600 max-w-lg mx-auto">
                        안전교육을 성공적으로 이수하였습니다. 여러분의 참여에 감사드립니다. 안전하고 즐거운 여정이 되기를 바랍니다!
                    </p>
                </div>
            ) : (
                <>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">안전교육 서약</h2>
                    <p className="text-slate-600 max-w-lg mx-auto mb-8">
                        본인은 증평 글로벌 그린리더 국외프로그램에 참여하는 학생으로서, 위 안전교육 내용을 모두 숙지하였으며, 프로그램 기간 동안 모든 규정을 성실히 준수할 것을 서약합니다.
                    </p>
                    <form onSubmit={handleSubmit} className="w-full max-w-sm">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-slate-700 text-sm font-bold mb-2">
                                서약자 이름
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="shadow appearance-none border border-yellow-300 bg-yellow-50 rounded-lg w-full py-3 px-4 text-gray-900 placeholder-gray-500 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                                placeholder="홍길동"
                                required
                            />
                        </div>
                        <div className={`mb-6 ${customSelectWrapper}`}>
                            <label htmlFor="school" className="block text-slate-700 text-sm font-bold mb-2">
                                학교
                            </label>
                            <select
                                id="school"
                                value={school}
                                onChange={(e) => setSchool(e.target.value)}
                                className={selectClassName}
                                required
                            >
                                {schools.map((schoolName) => (
                                    <option key={schoolName} value={schoolName}>
                                        {schoolName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:bg-slate-400"
                        >
                            {isSubmitting ? '제출 중...' : '서약 및 제출'}
                        </button>
                        {status === 'error' && <p className="text-red-500 text-sm mt-4">제출 중 오류가 발생했습니다. 다시 시도해주세요.</p>}
                    </form>
                </>
            )}
        </div>
    );
};

export default PledgePage;