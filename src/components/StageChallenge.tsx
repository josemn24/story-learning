import { StoryStage } from '../types';
import { useState } from 'react';

interface StageChallengeProps {
  stage: StoryStage;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: (e: React.FormEvent) => void;
  currentStage: number;
  totalStages: number;
  isStageCompleted: boolean;
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
  error: string;
}

const StageChallenge = ({
  stage,
  onNext,
  onPrevious,
  onSubmit,
  currentStage,
  totalStages,
  isStageCompleted,
  userAnswer,
  setUserAnswer,
  error,
}: StageChallengeProps) => {
  const [hasSeenExplanation, setHasSeenExplanation] = useState(false);

  if (!hasSeenExplanation && !isStageCompleted) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <div className="text-center">
              <h3 className="text-xl font-serif font-semibold text-gray-800 mb-4">Ready for the Challenge?</h3>
              <p className="text-gray-600 mb-6">
                To continue your journey through the story, you'll need to complete this challenge. 
                It will help you understand and remember the key elements of this chapter.
              </p>
              <button
                onClick={() => setHasSeenExplanation(true)}
                className="px-6 py-3 rounded-lg transition-colors font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                I Understand, Show Challenge →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-serif font-semibold text-gray-800">Checkpoint Challenge</h3>
          </div>
          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <p className="text-lg mb-4 text-gray-700">{stage.checkpoint.question}</p>
              
              {isStageCompleted ? (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center mb-2">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-green-700 font-medium">Correct Answer:</span>
                  </div>
                  <div className="text-gray-700">
                    {stage.checkpoint.type === 'multiple-choice' ? (
                      <p>{stage.checkpoint.answer}</p>
                    ) : stage.checkpoint.type === 'short-answer' ? (
                      <p>{stage.checkpoint.answer}</p>
                    ) : (
                      <p className="italic">Your creative writing response has been recorded.</p>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  {stage.checkpoint.type === 'multiple-choice' && (
                    <div className="space-y-3">
                      {stage.checkpoint.options?.map((option) => (
                        <label key={option} className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="answer"
                            value={option}
                            checked={userAnswer === option}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className="mr-3"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {(stage.checkpoint.type === 'short-answer' || 
                    stage.checkpoint.type === 'creative-writing') && (
                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                      rows={stage.checkpoint.type === 'creative-writing' ? 6 : 2}
                      placeholder={stage.checkpoint.type === 'creative-writing' 
                        ? "Write your story here..."
                        : "Enter your answer"}
                    />
                  )}
                </>
              )}
            </div>

            {error && !isStageCompleted && (
              <div className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg">{error}</div>
            )}

            {!isStageCompleted ? (
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg transition-colors font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Submit Answer
              </button>
            ) : (
              <button
                type="button"
                onClick={onNext}
                className="w-full px-6 py-3 rounded-lg transition-colors font-medium bg-green-600 text-white hover:bg-green-700"
              >
                Next Stage →
              </button>
            )}
          </form>

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-row justify-between items-center gap-4 sm:gap-0">
              <button
                onClick={onPrevious}
                className="w-auto px-4 py-2 rounded-lg border bg-white text-gray-700 hover:bg-gray-50 border-gray-200 transition-colors"
              >
                <span className="sm:hidden">←</span>
                <span className="hidden sm:inline">← Previous</span>
              </button>

              <div className="text-sm text-gray-500 italic">
                Page {currentStage + 1} of {totalStages}
              </div>

              <button
                onClick={onNext}
                disabled={!isStageCompleted}
                className={`w-auto px-4 py-2 rounded-lg transition-colors ${
                  isStageCompleted
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span className="sm:hidden">→</span>
                <span className="hidden sm:inline">Next Stage →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageChallenge; 