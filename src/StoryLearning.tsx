import { useState } from "react";

const storyStages = [
  {
    text: "You are an explorer who finds an ancient map in the jungle. It hints at a hidden treasure, but challenges lie ahead.",
    checkpoint: {
      question: "The map says the treasure is 200 meters north and 300 meters west. How far is it in a straight line?",
      answer: "360",
      type: "number",
    },
  },
  {
    text: "You decipher the map and continue your journey. Suddenly, you come across an ancient ruin with inscriptions on the walls.",
    checkpoint: {
      question: "The inscription is written in an ancient script. Which civilization is most known for its hieroglyphs?",
      answer: "Egyptians",
      type: "text",
    },
  },
  {
    text: "You move forward and discover a hidden chamber. The treasure lies ahead, but you take a moment to reflect on your journey.",
    checkpoint: {
      question: "Write a short diary entry describing your adventure so far.",
      answer: "*any*",
      type: "textarea",
    },
  },
];

function StoryLearningApp() {
  const [currentStage, setCurrentStage] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = () => {
    const checkpoint = storyStages[currentStage].checkpoint;
    
    if (checkpoint.type === "textarea" || userAnswer.trim().toLowerCase() === checkpoint.answer.toLowerCase()) {
      setCurrentStage(currentStage + 1);
      setUserAnswer("");
      setError(null);
    } else {
      setError("Incorrect answer. Try again.");
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg">
        {currentStage < storyStages.length ? (
          <>
            <p className="text-lg mb-4">{storyStages[currentStage].text}</p>
            <p className="font-semibold">{storyStages[currentStage].checkpoint.question}</p>
            {storyStages[currentStage].checkpoint.type === "textarea" ? (
              <textarea
                className="w-full p-2 border rounded mt-2"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
            ) : (
              <input
                type="text"
                className="w-full p-2 border rounded mt-2"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </>
        ) : (
          <h2 className="text-xl font-bold">Congratulations! You completed the story.</h2>
        )}
      </div>
    </div>
  );
}

export default StoryLearningApp;
