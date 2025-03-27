import { StoryStage } from '../types';

interface StageContentProps {
  stage: StoryStage;
  onNext: () => void;
  onPrevious: () => void;
  currentStage: number;
  totalStages: number;
  isStageCompleted: boolean;
}

const StageContent = ({
  stage,
  onNext,
  onPrevious,
  currentStage,
  totalStages,
  isStageCompleted,
}: StageContentProps) => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Title */}
      <h1 className="text-sm mb-6 md:mb-4 text-left text-gray-500">The Lost Explorer</h1>
      
      {/* Book Layout */}
      <div className="bg-white rounded-lg shadow-lg mb-6 lora-400">
        <div className="flex flex-col md:flex-row">
          {/* Left Page - Story Content */}
          <div className="flex-1 p-6 md:p-8">
            <div className="prose prose-lg">
              <p className="text-lg leading-relaxed text-gray-700 text-left">{stage.content}</p>
            </div>
          </div>

          {/* Center Separator - Only visible on desktop */}
          <div className="hidden md:block w-[2px] bg-gray-200 mx-[-1px] shadow-sm"></div>

          {/* Right Page - Image or Placeholder */}
          <div className="flex-1 p-6 md:p-8 border-t lg:border-t-0 border-gray-200">
            <div className="h-full flex flex-col justify-center">
              {stage.image ? (
                <div className="relative w-full h-full">
                  <img
                    src={stage.image.src}
                    alt={stage.image.alt}
                    className="object-contain w-full h-full rounded-lg"
                  />
                </div>
              ) : (
                <p className="text-gray-400 italic text-left">Turn the page to continue...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-row justify-between items-center gap-4 sm:gap-0">
        <button
          onClick={onPrevious}
          disabled={currentStage === 0}
          className={`w-auto px-4 py-2 rounded-lg border transition-colors ${
            currentStage === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
          }`}
        >
          <span className="sm:hidden">←</span>
          <span className="hidden sm:inline">← Previous</span>
        </button>

        <div className="text-sm text-gray-500 italic">
          Page {currentStage + 1} of {totalStages}
        </div>

        <button
          onClick={onNext}
          className={`w-auto px-4 py-2 rounded-lg transition-colors ${
            isStageCompleted
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <span className="sm:hidden">→</span>
          <span className="hidden sm:inline">
            {isStageCompleted ? 'View Solution →' : 'Next →'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default StageContent; 