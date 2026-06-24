import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { FileSection, Answers } from '../types';
import { downloadZip } from '../utils/generateMarkdown';
import { Download, FileText, CheckCircle } from 'lucide-react';

interface CompletionProps {
  sections: FileSection[];
  answers: Answers;
  onReset: () => void;
}

export const Completion: React.FC<CompletionProps> = ({ sections, answers, onReset }) => {
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadZip(answers, sections);
    } catch (error) {
      console.error('Failed to download zip', error);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    handleDownload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto flex flex-col items-center min-h-[60vh] justify-center text-center"
    >
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-8">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      
      <h1 className="text-4xl font-semibold text-gray-900 mb-4">
        Brand Brain Compiled
      </h1>
      
      <p className="text-lg text-gray-600 mb-10 max-w-xl">
        All context extraction questions have been completed successfully. 
        Your responses have been formatted with standard XML headers and compiled into {sections.length} markdown documents.
      </p>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-md p-6 mb-10 text-left">
        <h3 className="font-medium text-gray-900 mb-4 border-b border-gray-100 pb-2">Files ready for download:</h3>
        <ul className="space-y-3">
          {sections.map((section) => (
            <li key={section.id} className="flex items-center text-sm text-gray-700">
              <FileText className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" />
              <span className="font-medium">{section.fileName}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Download className="w-5 h-5" />
          <span>{isDownloading ? 'Packaging...' : 'Download All as ZIP'}</span>
        </button>
        
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          Start Over
        </button>
      </div>
    </motion.div>
  );
};
