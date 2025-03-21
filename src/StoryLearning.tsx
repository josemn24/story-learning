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
      if (currentStage === storyStages.length - 1) {
        setIsComplete(true);
      } else {
        setCurrentStage(prev => prev + 1);
        setUserAnswer('');
      }
    }
  };

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Congratulations!</h1>
        <p className="text-lg">You've completed the story and all its challenges!</p>
      </div>
    );
  }

  const currentStoryStage = storyStages[currentStage];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">The Lost Explorer</h2>
        <div className="prose">
          <p className="text-lg mb-4">{currentStoryStage.content}</p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Checkpoint Challenge</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="text-lg mb-3">{currentStoryStage.checkpoint.question}</p>
            
            {currentStoryStage.checkpoint.type === 'multiple-choice' && (
              <div className="space-y-2">
                {currentStoryStage.checkpoint.options?.map((option) => (
                  <label key={option} className="block">
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={userAnswer === option}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}

            {(currentStoryStage.checkpoint.type === 'short-answer' || 
              currentStoryStage.checkpoint.type === 'creative-writing') && (
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full p-2 border rounded-lg"
                rows={currentStoryStage.checkpoint.type === 'creative-writing' ? 4 : 1}
                placeholder={currentStoryStage.checkpoint.type === 'creative-writing' 
                  ? "Write your story here..."
                  : "Enter your answer"}
              />
            )}
          </div>

          {error && (
            <div className="text-red-500 mb-4">{error}</div>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Answer
          </button>
        </form>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Progress: Stage {currentStage + 1} of {storyStages.length}
      </div>
    </div>
  );
};

export default StoryLearning;
