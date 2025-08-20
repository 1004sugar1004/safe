import React from 'react';
import { ContentItem } from '../types';

const CheckIcon: React.FC = () => (
    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
);

const ContentPage: React.FC<ContentItem> = ({ title, items, image }) => {
    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 text-center">{title}</h2>
            {image && <img src={image} alt={title} className="rounded-lg w-full h-48 object-cover mb-6 shadow-md"/>}
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start p-3 bg-slate-50 rounded-lg">
                        <CheckIcon />
                        <span className="text-slate-700 text-base md:text-lg">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContentPage;