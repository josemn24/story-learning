import { StoryStage } from '../types';
import { useState } from 'react';
import NavigationControls from './NavigationControls';

interface StageChallengeProps {
  stage: StoryStage;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: (e: React.FormEvent) => void;
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
  isStageCompleted,
  userAnswer,
  setUserAnswer,
  error,
}: StageChallengeProps) => {
  const [hasSeenExplanation, setHasSeenExplanation] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Checkpoint Challenge</h3>
          </div>
          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <p className="text-lg text-left mb-4 text-gray-700">{stage.checkpoint.question}</p>
              
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

            {!isStageCompleted && (
              <div className="flex justify-center sm:justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-lg transition-colors font-medium bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                  Check Answer
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Navigation Controls */}
      <NavigationControls
        onPrevious={onPrevious}
        onNext={onNext}
        isNextDisabled={!isStageCompleted}
        nextButtonText="Next Stage →"
      />

      {/* Explanation Modal */}
      {!hasSeenExplanation && !isStageCompleted && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Ready for the Challenge?</h3>
              <p className="text-gray-600 mb-6">
                To continue your journey through the story, you'll need to complete this challenge. 
                It will help you understand and remember the key elements of this chapter.
              </p>
              <button
                onClick={() => setHasSeenExplanation(true)}
                className="px-6 py-3 rounded-lg transition-colors font-medium bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              >
                Start Challenge →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StageChallenge;
