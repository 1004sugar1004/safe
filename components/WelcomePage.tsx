import React from 'react';

interface WelcomePageProps {
  onStart: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center h-full">
      <div className="p-4">
        <svg className="w-24 h-24 mx-auto text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422A12.083 12.083 0 0121 18.722M12 14v7m-9-5l9 5 9-5m-9-5v7"></path>
          <path d="M3 7.5L7.5 10l-4.5 2.5V7.5zM21 7.5L16.5 10l4.5 2.5V7.5z"></path>
        </svg>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          국외프로그램 안전교육에 오신 것을 환영합니다.
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-8">
          이 교육은 여러분의 안전하고 즐거운 해외 경험을 위해 필수적인 내용을 담고 있습니다. 각 항목을 주의 깊게 읽고 퀴즈를 풀어 모든 내용을 숙지해주세요.
        </p>
        <button
          onClick={onStart}
          className="px-10 py-4 bg-blue-600 text-white font-bold text-lg rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
        >
          교육 시작하기
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;