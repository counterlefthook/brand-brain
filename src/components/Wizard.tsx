import React from 'react';
import { motion } from 'motion/react';
import { Answers, FileSection, Question } from '../types';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface WizardProps {
  sections: FileSection[];
  answers: Answers;
  onAnswerChange: (id: string, value: string) => void;
  onComplete: () => void;
}

export const Wizard: React.FC<WizardProps> = ({ sections, answers, onAnswerChange, onComplete }) => {
  const [currentSectionIdx, setCurrentSectionIdx] = React.useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = React.useState(0);

  const currentSection = sections[currentSectionIdx];
  const currentQuestion = currentSection.questions[currentQuestionIdx];

  const handleNext = () => {
    if (currentQuestionIdx < currentSection.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else if (currentSectionIdx < sections.length - 1) {
      setCurrentSectionIdx(currentSectionIdx + 1);
      setCurrentQuestionIdx(0);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    } else if (currentSectionIdx > 0) {
      setCurrentSectionIdx(currentSectionIdx - 1);
      setCurrentQuestionIdx(sections[currentSectionIdx - 1].questions.length - 1);
    }
  };

  const totalQuestions = sections.reduce((acc, curr) => acc + curr.questions.length, 0);
  const currentAbsoluteQuestion = 
    sections.slice(0, currentSectionIdx).reduce((acc, curr) => acc + curr.questions.length, 0) + 
    currentQuestionIdx + 1;
  const progressPercentage = (currentAbsoluteQuestion / totalQuestions) * 100;

  const isLastQuestion = 
    currentSectionIdx === sections.length - 1 && 
    currentQuestionIdx === currentSection.questions.length - 1;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col min-h-[60vh] justify-center relative">
      <div className="absolute top-0 left-0 w-full mb-8">
        <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
          <span>Question {currentAbsoluteQuestion} of {totalQuestions}</span>
          <span className="text-gray-900">{currentSection.fileName}</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="mt-16 bg-white p-8 md:p-12 shadow-sm border border-gray-100 rounded-2xl"
      >
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full mb-6 tracking-wide">
          {currentSection.title}
        </span>
        
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-6 leading-tight">
          {currentQuestion.label}
        </h2>
        
        {currentQuestion.description && (
          <p className="text-gray-500 mb-6">{currentQuestion.description}</p>
        )}

        <textarea
          autoFocus
          value={answers[currentQuestion.id] || ''}
          onChange={(e) => onAnswerChange(currentQuestion.id, e.target.value)}
          placeholder="Type your answer here..."
          className="w-full h-48 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
        />

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrev}
            disabled={currentSectionIdx === 0 && currentQuestionIdx === 0}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back</span>
          </button>
          
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
          >
            <span>{isLastQuestion ? 'Complete & Compile' : 'Next'}</span>
            {isLastQuestion ? <CheckCircle2 className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
