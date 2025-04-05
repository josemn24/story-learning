interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  currentStage?: number;
  totalStages?: number;
  isNextDisabled?: boolean;
  isPreviousDisabled?: boolean;
  nextButtonText?: string;
}

const NavigationControls = ({
  onPrevious,
  onNext,
  currentStage,
  totalStages,
  isNextDisabled = false,
  isPreviousDisabled = false,
  nextButtonText = 'Next →'
}: NavigationControlsProps) => {
  return (
    <div className="flex flex-row justify-between items-center gap-4 sm:gap-0">
      <button
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        className={`w-auto px-4 py-2 rounded-lg border transition-colors ${
          isPreviousDisabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200 cursor-pointer'
        }`}
      >
        <span className="sm:hidden">←</span>
        <span className="hidden sm:inline">← Previous</span>
      </button>

      {currentStage != null && totalStages != null && (
        <div className="text-sm text-gray-500 italic">
          Page {currentStage + 1} of {totalStages}
        </div>
      )}

      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`w-auto px-4 py-2 rounded-lg transition-colors ${
          isNextDisabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
        }`}
      >
        <span className="sm:hidden">→</span>
        <span className="hidden sm:inline">{nextButtonText}</span>
      </button>
    </div>
  );
};

export default NavigationControls;
