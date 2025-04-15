import { StoryStage } from "../types";
import { useState } from "react";
import NavigationControls from "./NavigationControls";
import { MdArrowBack, MdArrowForward, MdLock } from "react-icons/md";

interface StageChallengeProps {
  storyTitle: string;
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
  storyTitle,
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
    <div className="max-w-6xl mx-auto sm:p-4 lg:p-6">
      {/* Title */}
      <h1 className="text-sm mb-6 lg:mb-4 text-left text-gray-500">{ storyTitle }</h1>

      {/* Challenge Layout with Navigation */}
      <div className="relative mb-4">
        {/* Previous Button - Left Side */}
        <button
          onClick={onPrevious}
          className={`hidden xl:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 w-auto p-3 rounded-full border transition-colors bg-white text-gray-700 hover:bg-gray-50 border-gray-200 cursor-pointer hover:scale-110`}
          aria-label="Previous page"
        >
          <span className="text-xl">
            <MdArrowBack size={24} />
          </span>
        </button>

        {/* Explanation Content */}
        {!hasSeenExplanation && !isStageCompleted && (
          <div className="bg-white rounded-lg shadow-xl mb-6">
            <div className="p-6 lg:p-8 h-full lg:min-h-[520px] flex justify-center items-center">
              <div className="text-center max-w-md mx-auto">
                <div className="flex justify-center">
                  <MdLock size={128} className="mb-4 text-gray-600" />
                </div>
                <p className="text-gray-600 mb-6">
                  Para continuar tu recorrido por la historia, tendrás que completar un desafío.
                  Esto te ayudará a comprender y recordar los elementos clave de este capítulo.
                </p>
                <button
                  onClick={() => setHasSeenExplanation(true)}
                  className="px-6 py-3 rounded-lg transition-colors font-medium bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                  Empezar desafío →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Challenge Content */}
        {(hasSeenExplanation || isStageCompleted) && (
          <div className="bg-white rounded-lg shadow-lg mb-6">
            <div className="p-6 lg:p-8 h-full lg:min-h-[520px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Desafío
                </h3>
              </div>
              <form onSubmit={onSubmit}>
                <div className="mb-6">
                  <p className="text-lg text-left mb-4 text-gray-700">
                    {stage.checkpoint.question}
                  </p>

                  {isStageCompleted ? (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center mb-2">
                        <span className="text-green-600 mr-2">✓</span>
                        <span className="text-green-700 font-medium">
                          Correct Answer:
                        </span>
                      </div>
                      <div className="text-gray-700">
                        {stage.checkpoint.type === "multiple-choice" ? (
                          <p>{stage.checkpoint.answer}</p>
                        ) : stage.checkpoint.type === "short-answer" ? (
                          <p>{stage.checkpoint.answer}</p>
                        ) : (
                          <p className="italic">
                            Su respuesta de escritura creativa ha sido guardada.
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      {stage.checkpoint.type === "multiple-choice" && (
                        <div className="space-y-3">
                          {stage.checkpoint.options?.map((option) => (
                            <label
                              key={option}
                              className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors"
                            >
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

                      {(stage.checkpoint.type === "short-answer" ||
                        stage.checkpoint.type === "creative-writing") && (
                        <textarea
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                          rows={
                            stage.checkpoint.type === "creative-writing" ? 6 : 2
                          }
                          placeholder={
                            stage.checkpoint.type === "creative-writing"
                              ? "Write your story here..."
                              : "Enter your answer"
                          }
                        />
                      )}
                    </>
                  )}
                </div>

                {error && !isStageCompleted && (
                  <div className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg">
                    {error}
                  </div>
                )}

                {!isStageCompleted && (
                  <div className="flex justify-center sm:justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 rounded-lg transition-colors font-medium bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    >
                      Comprobar
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* Next Button - Right Side */}
        <button
          onClick={onNext}
          disabled={!isStageCompleted}
          className={`hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 w-auto p-3 rounded-full transition-colors ${
            isStageCompleted
              ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer hover:scale-110"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          aria-label="Next page"
        >
          <span className="text-xl">
            <MdArrowForward size={24} />
          </span>
        </button>
      </div>

      {/* Page Counter */}
      <NavigationControls
        onPrevious={onPrevious}
        onNext={onNext}
        isNextDisabled={!isStageCompleted}
        isPreviousDisabled={false}
        nextButtonText="Siguiente →"
      />
    </div>
  );
};

export default StageChallenge;
