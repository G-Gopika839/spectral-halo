import React, { useState } from 'react';
import { HelpCircle, Check, X } from 'lucide-react';

const QuizOverlay = ({ question, options, onAnswer }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleOptionClick = (index) => {
        setSelectedOption(index);
        const correct = index === question.correctAnswer;
        setIsCorrect(correct);

        // Delay reporting back to parent to show animation
        setTimeout(() => {
            onAnswer(correct);
            setSelectedOption(null);
            setIsCorrect(null);
        }, 1500);
    };

    return (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full mr-3">
                            <HelpCircle className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Knowledge Check</h3>
                    </div>

                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{question.text}</p>

                    <div className="space-y-3">
                        {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                disabled={selectedOption !== null}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex justify-between items-center
                  ${selectedOption === null
                                        ? 'border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-gray-700'
                                        : selectedOption === index
                                            ? (isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20')
                                            : 'border-gray-200 dark:border-gray-700 opacity-50'
                                    }
                `}
                            >
                                <span className={`font-medium ${selectedOption === index ? (isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300') : 'text-gray-700 dark:text-gray-300'}`}>
                                    {option}
                                </span>

                                {selectedOption === index && (
                                    isCorrect ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        Answer correctly to continue the video.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QuizOverlay;
