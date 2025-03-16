import { useState } from "react";

const storyStages = [
  {
    text: "Lena and Jake were cleaning Grandma’s attic when Jake’s foot hit something. \"What’s this?\" he asked, pulling out an old, dusty envelope from under a wooden chest.\n\nLena carefully opened the letter and read aloud:\n\n‘If you seek adventure and a prize so neat, follow the path to Willow Creek.\nLook for the oak with roots so wide, where secrets in the hollow hide.’\n\n\"Wow!\" Jake exclaimed. \"This sounds like a treasure hunt!\"\n\nLena nodded excitedly. \"We have to find that oak tree!\"",
    checkpoint: {
      question: "Where do Lena and Jake need to go to start their adventure?",
      answer: "Willow Creek",
      type: "text",
    },
  },
  {
    text: "The kids arrived at Willow Creek and searched for the biggest oak tree.\n\"This one has the widest roots!\" Jake said, pointing.\n\nCarved into the bark were two numbers: 42 and 58. Below it, an arrow pointed down to the hollow.\n\nLena thought for a moment. \"I think we need to solve a math problem to open the next clue!\"",
    checkpoint: {
      question: "Add the two numbers carved on the tree. What is the sum?",
      answer: "100",
      type: "number",
    },
  },
  {
    text: "Inside the hollow, they found a single feather tied to another note:\n\n‘Follow the owner of this feather, swift and bright,\nWhere it nests, you’ll find the next sight.’\n\nJake looked at the feather. \"I think this came from a bird!\"\n\nLena nodded. \"But which one? We need to figure out which bird is swift and bright!\"",
    checkpoint: {
      question: "Which bird is known for being fast and colorful?",
      answer: "Hummingbird",
      type: "text",
    },
  },
  {
    text: "The kids followed the hummingbirds to a small wooden house near the creek. Inside, they found an old box filled with postcards, a compass, and a golden locket. The last note read:\n\n‘The real treasure isn’t gold, but the stories we share and the adventures we dare!’\n\nLena smiled. \"This belonged to my great-grandfather! He must have hidden it here years ago!\"",
    checkpoint: {
      question: "Write a short letter to your best friend about your own treasure hunt adventure. What would you say?",
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full flex flex-col md:flex-row">
        {currentStage < storyStages.length ? (
          <>
            <div className="w-full md:w-1/2 p-4 border-r border-gray-300">
              <h2 className="text-xl font-bold mb-4">Story</h2>
              <p className="text-lg">{storyStages[currentStage].text}</p>
            </div>
            <div className="w-full md:w-1/2 p-4">
              <h2 className="text-xl font-bold mb-4">Checkpoint</h2>
              <p className="font-semibold mb-2">{storyStages[currentStage].checkpoint.question}</p>
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
            </div>
          </>
        ) : (
          <h2 className="text-xl font-bold text-center w-full">Congratulations! You completed the story.</h2>
        )}
      </div>
    </div>
  );
}

export default StoryLearningApp;
