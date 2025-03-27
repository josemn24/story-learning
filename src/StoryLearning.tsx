import { useState } from 'react';
import StageContent from './components/StageContent';
import StageChallenge from './components/StageChallenge';
import { StoryStage } from './types';

// Story content
const storyStages: StoryStage[] = [
  {
    content: "You are an explorer who finds an ancient map in the jungle. It hints at a hidden treasure, but challenges lie ahead.",
    checkpoint: {
      type: 'short-answer',
      question: "The map says the treasure is 200 meters north and 300 meters west. How far is it in a straight line?",
      answer: 360,
    },
    image: {
      src: "/images/stage1.png",
      alt: "An ancient treasure map with mysterious markings"
    }
  },
  {
    content: "You decipher the map and continue your journey. Suddenly, you come across an ancient ruin with inscriptions on the walls.",
    checkpoint: {
      type: 'multiple-choice',
      question: "The inscription is written in an ancient script. Which civilization is most known for its hieroglyphs?",
      answer: "Egyptians",
      options: ["Mayans", "Romans", "Egyptians", "Greeks"],
    },
    image: {
      src: "/images/stage2.png",
      alt: "Ancient ruins with hieroglyphic inscriptions"
    }
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
  const [showChallenge, setShowChallenge] = useState(false);

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
        setCurrentStage(prev => prev + 1);
        setShowChallenge(false);
        setUserAnswer('');
        setError('');
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentStage > 0) {
      setCurrentStage(prev => prev - 1);
      setShowChallenge(true);
      setUserAnswer('');
      setError('');
    }
  };

  const handleStartChallenge = () => {
    setShowChallenge(true);
  };

  const handleNextStage = () => {
    if (currentStage < storyStages.length - 1) {
      setCurrentStage(prev => prev + 1);
      setShowChallenge(false);
      setUserAnswer('');
      setError('');
    }
  };

  const isStageCompleted = (stage: number) => completedStages.includes(stage);

  if (isComplete) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Congratulations!</h1>
        <p className="text-lg">You've completed the story and all its challenges!</p>
      </div>
    );
  }

  const currentStoryStage = storyStages[currentStage];
  const isCurrentStageCompleted = isStageCompleted(currentStage);

  if (showChallenge) {
    return (
      <StageChallenge
        stage={currentStoryStage}
        onBack={() => setShowChallenge(false)}
        onNext={handleNextStage}
        onPrevious={handlePreviousPage}
        onSubmit={handleSubmit}
        currentStage={currentStage}
        totalStages={storyStages.length}
        isStageCompleted={isCurrentStageCompleted}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        error={error}
      />
    );
  }

  return (
    <StageContent
      stage={currentStoryStage}
      onNext={handleStartChallenge}
      onPrevious={handlePreviousPage}
      currentStage={currentStage}
      totalStages={storyStages.length}
      isStageCompleted={isCurrentStageCompleted}
    />
  );
};

export default StoryLearning;
