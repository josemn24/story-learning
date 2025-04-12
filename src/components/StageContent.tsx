import { StoryStage } from '../types';
import NavigationControls from './NavigationControls';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

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
    <div className="max-w-6xl mx-auto p-4 lg:p-6">
      {/* Title */}
      <h1 className="text-sm mb-6 lg:mb-4 text-left text-gray-500">The Lost Explorer</h1>
      
      {/* Book Layout with Navigation */}
      <div className="relative mb-4">
        {/* Previous Button - Left Side */}
        <button
          onClick={onPrevious}
          disabled={currentStage === 0}
          className={`hidden xl:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 w-auto p-3 rounded-full border transition-colors ${
            currentStage === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200 cursor-pointer hover:scale-110'
          }`}
          aria-label="Previous page"
        >
          <span className="text-xl">
            <MdArrowBack size={24} />
          </span>
        </button>

        {/* Book Content */}
        <div className="bg-white rounded-lg shadow-lg mb-6 lora-400">
          <div className="flex flex-col lg:flex-row h-full min-h-[520px]">
            {/* Left Page - Story Content */}
            <div className="flex-1 p-6 lg:p-8">
              <div className="prose prose-lg">
                <p className="text-lg leading-relaxed text-gray-700 text-left">{stage.content}</p>
              </div>
            </div>

            {/* Center Separator - Only visible on desktop */}
            <div className="hidden lg:block w-[2px] bg-gray-200 mx-[-1px] shadow-sm"></div>

            {/* Right Page - Image or Placeholder */}
            <div className="flex-1 p-6 lg:p-8 border-t lg:border-t-0 border-gray-200">
              <div className="h-full flex flex-col justify-center">
                {stage.image ? (
                  <div className="relative w-full pt-[75%]">
                    <img
                      src={stage.image.src}
                      alt={stage.image.alt}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <p className="text-gray-400 italic text-left">Turn the page to continue...</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Next Button - Right Side */}
        <button
          onClick={onNext}
          className={`hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 w-auto p-3 rounded-full transition-colors ${
            isStageCompleted
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } cursor-pointer hover:scale-110`}
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
        currentStage={currentStage}
        totalStages={totalStages}
        isNextDisabled={false}
        isPreviousDisabled={currentStage === 0}
        nextButtonText={isStageCompleted ? 'View Solution →' : 'Next →'}
      />
    </div>
  );
};

export default StageContent; 
