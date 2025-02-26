import { useEffect, useState } from "react";
import "./App.css";
import AnswButton from "./components/AnswButton";
import Txt from "./components/Txt";
import { data } from "./components/Data.js";

function App() {
  const [IsSubmited, setIsSubmited] = useState(false);
  const [QuestionInProgress, setQuestionInProgress] = useState(false);
  const [QuizzInProgress, setQuizzInProgress] = useState(false);
  const [Topic, setTopic] = useState("none");
  const [Question, setQuestion] = useState(null);
  const [step, setStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const selectedQuestion = data.find((el) => el.title === Topic);
    setQuestion(selectedQuestion);
    // Reset step, selected answer and submission state when a new topic is selected
    setStep(0);
    setIsSubmited(false);
    setSelectedAnswer(null);
    setError("");
  
  }, [Topic]);
  return (
    <div className="main">
      {/* design start */}
      <div className="background"></div>
      <div className="decoration" style={{ left: "0", top: "0" }}>
        <div className="minisircle"></div>
      </div>
      <div
        className="decoration"
        style={{ right: "0", bottom: "0", transform: "rotate(180deg)" }}
      >
        <div className="minisircle"></div>
      </div>
      {/* design end */}
      <div className="QuestionContainer">
        <Txt
          QuizzInProgress={QuizzInProgress}
          question={Question}
          step={step}
        />
        <div className="AnswersBox">
          {QuizzInProgress
            ? Question &&
              Question.questions[step].options.map((el, i) => (
                <AnswButton
                  key={`${step}-${i}`}
                  BoxColor="#F4F6FA"
                  img={null}
                  Number={
                    i === 0
                      ? "A"
                      : i === 1
                      ? "B"
                      : i === 2
                      ? "C"
                      : i === 3
                      ? "D"
                      : ""
                  }
                  Answr={el}
                  IsSubmited={IsSubmited}
                  QuestionInProgress={QuestionInProgress}
                  setQuizzInProgress={setQuizzInProgress}
                  IsCorrect={Question.questions[step].answer === el}
                  selected={selectedAnswer === i}
                  onSelect={() => {
                    setSelectedAnswer(i);
                    setError("");
                  }}
                />
              ))
            : data.map((el, i) => (
                <AnswButton
                  key={i}
                  BoxColor={el.bg}
                  img={el.icon}
                  Number=""
                  Answr={el.title}
                  IsSubmited={IsSubmited}
                  QuestionInProgress={QuestionInProgress}
                  setQuestionInProgress={setQuestionInProgress}
                  setQuizzInProgress={setQuizzInProgress}
                  setTopic={setTopic}
                  IsCorrect={true}
                />
              ))}

          <button
            className="Submit"
            onClick={() => {
              if (QuizzInProgress && selectedAnswer === null) {
                setError("Please select an answer");
                return;
              }
              if (IsSubmited) {
                if (Question && step < Question.questions.length - 1) {
                  setStep(step + 1);
                  setIsSubmited(false);
                  setQuestionInProgress(true);
                  setSelectedAnswer(null);
                  setError("");
                } else {
                  alert("Quiz complete!");
                }
              } else {
                setIsSubmited(true);
                setQuestionInProgress(false);
              }
            }}
            style={{
              display: `${QuizzInProgress ? "" : "none"}`,
            }}
          >
            <h1 style={{ color: "#fff", fontSize: "24px" }}>
              {IsSubmited ? "Next Question" : "Submit Answer"}
            </h1>
          </button>

          {QuizzInProgress && error && (
            <div className="errorMsg">
              <img
                src="Incorrect.png"
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
              <p style={{ color: "red" }}> {error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
