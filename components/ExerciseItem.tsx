import React, { useState } from 'react';
import { Exercise, ExerciseType } from '../types';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface ExerciseItemProps {
  exercise: Exercise;
  index: number;
}

export const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, index }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const checkAnswer = () => {
    const userAnswer = exercise.type === ExerciseType.MULTIPLE_CHOICE ? selectedOption : textInput;
    
    if (!userAnswer.trim()) return;

    const normalizedUser = userAnswer.trim().toLowerCase();
    const normalizedCorrect = exercise.correctAnswer.trim().toLowerCase();

    setIsCorrect(normalizedUser === normalizedCorrect);
    setIsSubmitted(true);
  };

  const resetExercise = () => {
    setIsSubmitted(false);
    setIsCorrect(false);
    setSelectedOption('');
    setTextInput('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-sm">
            {index + 1}
          </span>
          <div className="flex-grow">
            <h4 className="text-lg font-medium text-slate-900 mb-4 leading-relaxed">
              {exercise.question}
            </h4>

            {/* Input Area */}
            <div className="mb-6">
              {exercise.type === ExerciseType.MULTIPLE_CHOICE && exercise.options ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {exercise.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => !isSubmitted && setSelectedOption(option)}
                      disabled={isSubmitted}
                      className={`
                        px-4 py-3 text-left rounded-lg border transition-all duration-200
                        ${isSubmitted && option === exercise.correctAnswer 
                          ? 'bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500' 
                          : isSubmitted && selectedOption === option && option !== exercise.correctAnswer
                            ? 'bg-red-50 border-red-500 text-red-700'
                            : selectedOption === option
                              ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500'
                              : 'bg-white border-slate-200 hover:bg-slate-50'
                        }
                      `}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  disabled={isSubmitted}
                  placeholder="Введите ответ..."
                  className={`
                    w-full max-w-md px-4 py-3 rounded-lg border outline-none transition-colors
                    ${isSubmitted 
                      ? isCorrect 
                        ? 'border-green-500 bg-green-50 text-green-900' 
                        : 'border-red-500 bg-red-50 text-red-900'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                    }
                  `}
                />
              )}
            </div>

            {/* Actions & Feedback */}
            {!isSubmitted ? (
              <button
                onClick={checkAnswer}
                disabled={exercise.type === ExerciseType.MULTIPLE_CHOICE ? !selectedOption : !textInput}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Проверить
              </button>
            ) : (
              <div className={`rounded-lg p-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect ? 'Правильно!' : 'Неправильно'}
                  </span>
                </div>
                
                {!isCorrect && (
                  <div className="text-sm text-red-800 mb-2">
                    Правильный ответ: <span className="font-bold">{exercise.correctAnswer}</span>
                  </div>
                )}

                <div className="mt-2 text-slate-700 text-sm border-t border-black/5 pt-2 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <p>{exercise.explanation}</p>
                </div>

                <button 
                  onClick={resetExercise}
                  className="mt-4 text-sm font-medium text-slate-500 hover:text-slate-800 underline"
                >
                  Попробовать снова
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};