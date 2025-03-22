import { useState } from 'react';

// Types for our story system
type QuestionType = 'multiple-choice' | 'short-answer' | 'creative-writing';

interface Checkpoint {
  type: QuestionType;
  question: string;
  answer?: string | number;
  options?: string[];
}

interface StoryStage {
  content: string;
  checkpoint: Checkpoint;
}

// Story content
const storyStages: StoryStage[] = [
  {
    content: "You are an explorer who finds an ancient map in the jungle. It hints at a hidden treasure, but challenges lie ahead.",
    checkpoint: {
      type: 'short-answer',
      question: "The map says the treasure is 200 meters north and 300 meters west. How far is it in a straight line?",
      answer: 360,
    },
  },
  {
    content: "You decipher the map and continue your journey. Suddenly, you come across an ancient ruin with inscriptions on the walls.",
    checkpoint: {
      type: 'multiple-choice',
      question: "The inscription is written in an ancient script. Which civilization is most known for its hieroglyphs?",
      answer: "Egyptians",
      options: ["Mayans", "Romans", "Egyptians", "Greeks"],
    },
  },
  {
    content: "You move forward and discover a hidden chamber. The treasure lies ahead, but you take a moment to reflect on your journey.",
    checkpoint: {
      type: 'creative-writing',
      question: "Write a short diary entry describing your adventure so far.",
    },
  },
];

const StoryLearning = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const validateAnswer = (answer: string) => {
    const checkpoint = storyStages[currentStage].checkpoint;
    let isCorrect: boolean;
    
    switch (checkpoint.type) {
      case 'multiple-choice':
      case 'short-answer':
        isCorrect = String(answer).toLowerCase() === String(checkpoint.answer).toLowerCase();
        if (!isCorrect) {
          setError('That\'s not quite right. Try again!');
          return false;
        }
        break;
      case 'creative-writing':
        // Any input is valid for creative writing
        if (answer.trim().length < 10) {
          setError('Please write a bit more!');
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (validateAnswer(userAnswer)) {
      setCompletedStages(prev => [...prev, currentStage]);
      if (currentStage === storyStages.length - 1) {
        setIsComplete(true);
      } else {
        // Automatically navigate to next stage
        setCurrentStage(prev => prev + 1);
        setUserAnswer('');
        setError('');
      }
    }
  };

  const handleNextPage = () => {
    if (currentStage < storyStages.length - 1) {
      setCurrentStage(prev => prev + 1);
      setUserAnswer('');
      setError('');
    }
  };

  const handlePreviousPage = () => {
    if (currentStage > 0) {
      setCurrentStage(prev => prev - 1);
      setUserAnswer('');
      setError('');
    }
  };

  const isStageCompleted = (stage: number) => completedStages.includes(stage);
  const canProceedToNext = isStageCompleted(currentStage);

  if (isComplete) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Congratulations!</h1>
        <p className="text-lg">You've completed the story and all its challenges!</p>
      </div>
    );
  }

  const currentStoryStage = storyStages[currentStage];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex gap-8">
        {/* Left Page - Story Content */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-8 border-r-2 border-gray-200">
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold mb-6 text-gray-800">The Lost Explorer</h2>
            <div className="prose prose-lg">
              <p className="text-lg leading-relaxed text-gray-700">{currentStoryStage.content}</p>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-gray-500 italic">
              Page {currentStage + 1} of {storyStages.length}
            </div>
            <div className="flex gap-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentStage === 0}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  currentStage === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={!canProceedToNext}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  canProceedToNext
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Page - Questions */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-8">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h3 className="text-xl font-serif font-semibold mb-6 text-gray-800">Checkpoint Challenge</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <p className="text-lg mb-4 text-gray-700">{currentStoryStage.checkpoint.question}</p>
                
                {currentStoryStage.checkpoint.type === 'multiple-choice' && (
                  <div className="space-y-3">
                    {currentStoryStage.checkpoint.options?.map((option) => (
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

                {(currentStoryStage.checkpoint.type === 'short-answer' || 
                  currentStoryStage.checkpoint.type === 'creative-writing') && (
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    rows={currentStoryStage.checkpoint.type === 'creative-writing' ? 6 : 2}
                    placeholder={currentStoryStage.checkpoint.type === 'creative-writing' 
                      ? "Write your story here..."
                      : "Enter your answer"}
                  />
                )}
              </div>

              {error && (
                <div className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg">{error}</div>
              )}

              <button
                type="submit"
                disabled={isStageCompleted(currentStage)}
                className={`w-full px-6 py-3 rounded-lg transition-colors font-medium ${
                  isStageCompleted(currentStage)
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isStageCompleted(currentStage) ? 'Completed ✓' : 'Submit Answer'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryLearning;
