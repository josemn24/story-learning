import { useState } from 'react';
import StageContent from './components/StageContent';
import StageChallenge from './components/StageChallenge';
import { Story, StoryStage } from './types';
import { third_story } from './stories';
import Confetti from 'react-confetti';

// Story content
const story: Story = third_story;
const story_stages: StoryStage[] = story.stages;

const StoryLearning = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [showChallenge, setShowChallenge] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const validateAnswer = (answer: string) => {
    const checkpoint = story_stages[currentStage].checkpoint;
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
    if (currentStage < story_stages.length - 1) {
      setCurrentStage(prev => prev + 1);
      setShowChallenge(false);
      setUserAnswer('');
      setError('');
    } else {
      setIsComplete(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false); // Hide confetti after 5 seconds
      }, 10000);
    }
  };

  const isStageCompleted = (stage: number) => completedStages.includes(stage);

  if (isComplete) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        {showConfetti && <Confetti />} {/* Render confetti */}
        <div className="bg-white rounded-lg shadow-lg mb-6 lora-400">
          <div className="flex flex-col justify-center items-center h-full p-6 lg:min-h-[520px]">
            <h1 className="text-3xl font-bold text-green-600 mb-4">¡Enhorabuena!</h1>
            <p className="text-lg">¡Has completado el cuento y todos sus desafíos!</p>
          </div>
        </div>
      </div>
    );
  }

  const currentStoryStage = story_stages[currentStage];
  const isCurrentStageCompleted = isStageCompleted(currentStage);

  if (showChallenge) {
    return (
      <StageChallenge
        storyTitle={story.title}
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
      storyTitle={story.title}
      stage={currentStoryStage}
      onNext={handleStartChallenge}
      onPrevious={handlePreviousPage}
      currentStage={currentStage}
      totalStages={story_stages.length}
      isStageCompleted={isCurrentStageCompleted}
      layoutType={currentStoryStage.layoutType || 'text-left-image-right'}
    />
  );
};

export default StoryLearning;
