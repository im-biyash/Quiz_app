import React, { useState } from "react";
import "./App.css";
import questions from "./Data";
import instagram from "./assets/instagram.png";
import Linkdein from "./assets/linkedin.png";

function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleClick = (index) => {
    setSelectedOptionIndex(index);
  };

  const handleNext = () => {
    if (selectedOptionIndex !== null) {
      // Check if selected option is correct and update score
      if (questions[currentQuestionIndex].answer === questions[currentQuestionIndex].options[selectedOptionIndex]) {
        setScore((prevScore) => prevScore + 1); // Increment score
      }

      // Move to the next question or show result
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOptionIndex(null);
      } else {
        setShowResult(true); // Show result when all questions are answered
      }
    } else {
      alert("Please select an option before proceeding.");
    }
  };

  return (
    <>
      {showResult ? (
        <div className="bg-blue-300 text-white flex flex-col justify-center items-center h-screen ">
          <h1 className="text-4xl text-black font-mono font-bold mb-2">Simple Quiz app</h1>
          <div className="flex flex-col justify-center items-center bg-white h-[300px] w-[300px] ">
            <h1 className="bold text-3xl bg-red-600 mb-5 rounded-lg">Congratulations</h1>
            <h1 className="text-black text-2xl">Your score is {score} out of {questions.length}</h1>
            <button onClick={() => window.location.reload()} className="mt-2 text-black p-2 rounded focus:outline-none hover:bg-gray-400 transition bg-cyan-300">Play again</button>
            <span className="text-black font-serif mt-9 ml-7">made by Biyash Shrestha</span>
            <div className="logos flex gap-0 ">   
            <img src={instagram} className="mt-2 w-14 h-auto hover:scale-125" onClick={() => window.open('https://www.instagram.com/biyash10/')}/>
            <img src={Linkdein} className="mt-2 w-9 h-auto hover:scale-125"onClick={() => window.open('https://www.linkedin.com/in/biyash-shrestha-375593278/')} />
            </div>
            {/* https://www.linkedin.com/in/biyash-shrestha-375593278/ */}
          </div>
        </div>
      ) : (
        <div className="bg-blue-300 text-white flex flex-col justify-center items-center h-screen">
          <h1 className="text-3xl text-black font-mono font-bold">Simple Quiz app</h1>
          <div className="question_card bg-white flex flex-col justify-start h-[400px] w-[500px] border-b-black shadow-md p-4">
            <div className="questions mb-4">
              <h2 className="text-xl text-black mb-2">
                {questions[currentQuestionIndex].question}
              </h2>
            </div>
            <div className="options grid grid-cols-1 gap-4">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  className={` text-black p-2 rounded focus:outline-none hover:bg-gray-400 transition ${
                    selectedOptionIndex === index ? "bg-gray-600" : "bg-gray-300"
                  }`}
                  onClick={() => handleClick(index)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              className="bg-green-300 text-black p-2 mt-4 rounded focus:outline-none hover:bg-gray-400 transition"
              onClick={handleNext}
            >
              {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
