/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BRAND_FILES } from './data/questions';
import { Wizard } from './components/Wizard';
import { Completion } from './components/Completion';
import { Answers } from './types';
import { BrainCircuit } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleComplete = () => {
    setCompleted(true);
  };

  const handleReset = () => {
    setStarted(false);
    setCompleted(false);
    setAnswers({});
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-blue-100 selection:text-blue-900 text-gray-900 flex flex-col">
      <header className="border-b border-gray-200 bg-white px-6 py-4 flex items-center shadow-sm">
        <div className="flex items-center space-x-2 text-blue-600">
          <BrainCircuit className="w-6 h-6" />
          <span className="font-semibold text-lg tracking-tight">BrandBrain Context Generator</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 overflow-x-hidden">
        {!started && !completed && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-center"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-blue-100">
              <BrainCircuit className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-6">
              Build your Brand Brain
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto">
              Create a persistent context repository for your AI agents and LLMs. 
              Answer a series of targeted questions to define your brand promise, audience, style guide, and constraints.
            </p>
            <button
              onClick={() => setStarted(true)}
              className="bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-xl font-medium transition-all shadow-sm hover:shadow"
            >
              Start Extraction
            </button>
          </motion.div>
        )}

        {started && !completed && (
          <Wizard 
            sections={BRAND_FILES} 
            answers={answers} 
            onAnswerChange={handleAnswerChange}
            onComplete={handleComplete}
          />
        )}

        {completed && (
          <Completion 
            sections={BRAND_FILES}
            answers={answers}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}
