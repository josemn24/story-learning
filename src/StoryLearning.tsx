import { useState } from 'react';
import StageContent from './components/StageContent';
import StageChallenge from './components/StageChallenge';
import { StoryStage } from './types';
import { second_story } from './stories';

// Story content
const story: StoryStage[] = second_story;

const StoryLearning = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [showChallenge, setShowChallenge] = useState(false);

  const validateAnswer = (answer: string) => {
    const checkpoint = story[currentStage].checkpoint;
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
      setError('');
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
    if (currentStage < story.length - 1) {
      setCurrentStage(prev => prev + 1);
      setShowChallenge(false);
      setUserAnswer('');
      setError('');
    } else {
      setIsComplete(true);
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

  const currentStoryStage = story[currentStage];
  const isCurrentStageCompleted = isStageCompleted(currentStage);

  if (showChallenge) {
    return (
      <StageChallenge
        stage={currentStoryStage}
        onNext={handleNextStage}
        onPrevious={() => setShowChallenge(false)}
        onSubmit={handleSubmit}
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
      totalStages={story.length}
      isStageCompleted={isCurrentStageCompleted}
    />
  );
};

export default StoryLearning;
