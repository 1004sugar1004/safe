import React, { useState } from 'react';

const PledgePage: React.FC = () => {
    const [name, setName] = useState('');
    const [school, setSchool] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !school.trim()) {
            alert('이름과 학교를 모두 입력해주세요.');
            return;
        }

        setIsSubmitting(true);
        setStatus('idle');
        
        // --- Google Apps Script 연동 ---
        // 1. 구글 스프레드시트를 생성하고 '확장 프로그램' > 'Apps Script'로 이동합니다.
        // 2. 안내받은 스크립트 코드를 붙여넣고 저장합니다.
        // 3. '배포' > '새 배포'를 클릭합니다.
        // 4. 유형을 '웹 앱'으로 설정하고, '액세스 권한이 있는 사용자'를 '모든 사용자'로 변경한 후 배포합니다.
        // 5. 배포 후 나타나는 웹 앱 URL을 복사하여 아래 상수에 붙여넣습니다.

        // ❗️❗️ 중요: 아래 URL을 본인의 Google Apps Script 웹 앱 URL로 교체해주세요! ❗️❗️
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzuyhCAfNCt79Hf033-SrzVXFnza2khjnXEAqvcc_5HrR9bpOoAJL5TI6qvybXqPQHB/exec'; // <-- 이 URL을 교체하세요.

        if (GOOGLE_SCRIPT_URL === 'https://script.google.com/macros/s/AKfycbzuyhCAfNCt79Hf033-SrzVXFnza2khjnXEAqvcc_5HrR9bpOoAJL5TI6qvybXqPQHB/exec') {
             console.log("Pledge submitted (simulated):", { name, school, timestamp: new Date().toISOString() });
             alert("시뮬레이션 모드입니다. 실제 데이터 저장을 위해서는 PledgePage.tsx 파일의 GOOGLE_SCRIPT_URL을 실제 배포 URL로 교체해야 합니다.");
             setTimeout(() => {
                setIsSubmitting(false);
                setStatus('success');
             }, 1000);
             return;
        }

        try {
            // Google Apps Script는 CORS 정책으로 인해 'no-cors' 모드가 필요할 수 있습니다.
            // 이 모드에서는 직접적인 response body를 읽을 수 없지만, 데이터는 정상적으로 전송됩니다.
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
                        <div className="mb-6">
                            <label htmlFor="school" className="block text-slate-700 text-sm font-bold mb-2">
                                학교
                            </label>
                            <input
                                type="text"
                                id="school"
                                value={school}
                                onChange={(e) => setSchool(e.target.value)}
                                className="shadow appearance-none border border-yellow-300 bg-yellow-50 rounded-lg w-full py-3 px-4 text-gray-900 placeholder-gray-500 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                                placeholder="증평중학교"
                                required
                            />
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