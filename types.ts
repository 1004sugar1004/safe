export interface ContentItem {
    type: 'content';
    title: string;
    items: string[];
    image?: string;
}

export interface QuizQuestion {
    type: 'quiz';
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

export type CourseStep = ContentItem | QuizQuestion;