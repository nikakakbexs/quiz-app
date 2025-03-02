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
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const selectedQuestion = data.find((el) => el.title === Topic);
    setQuestion(selectedQuestion);
    // Reset state when a new topic is selected
    setStep(0);
    setIsSubmited(false);
    setSelectedAnswer(null);
    setError("");
    setScore(0);
    setQuizCompleted(false);
  }, [Topic]);

  const handlePlayAgain = () => {
    // Reset to the initial state where the topic selection page is shown
    setTopic("none");
    setQuizzInProgress(false);
    setQuestionInProgress(false);
  };

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
        {quizCompleted ? (
          <>
            {/* Left column: Final text */}
            <div
              className="finalLeft"
              style={{
                width: "465px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <p style={{ fontSize: "64px", margin: 0 }}>Quiz completed</p>
              <p style={{ fontSize: "64px", margin: 0 }}>You scored...</p>
            </div>
            {/* Right column: Final score, score fraction, and Play Again button */}
            <div
              className="finalRight"
              style={{
                width: "480px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <p style={{ fontSize: "144px", margin: 0 }}>{score}</p>
              <p style={{ fontSize: "24px", margin: 0 }}>
                {score} / {Question.questions.length}
              </p>
              <button className="Submit" onClick={handlePlayAgain}>
                <h1 style={{ color: "#fff", fontSize: "24px" }}>Play Again</h1>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Quiz in progress: Question text on the left */}
            <Txt
              QuizzInProgress={QuizzInProgress}
              question={Question}
              step={step}
            />
            {/* Quiz in progress: Answer buttons, submit button, error msg on the right */}
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

              {QuizzInProgress && (
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
                        // Last question has been submitted – show the final screen
                        setQuizCompleted(true);
                      }
                    } else {
                      // On first submission, update the score if the selected answer is correct
                      if (
                        Question &&
                        Question.questions[step].options[selectedAnswer] ===
                          Question.questions[step].answer
                      ) {
                        setScore((prev) => prev + 1);
                      }
                      setIsSubmited(true);
                      setQuestionInProgress(false);
                    }
                  }}
                >
                  <h1 style={{ color: "#fff", fontSize: "24px" }}>
                    {IsSubmited ? "Next Question" : "Submit Answer"}
                  </h1>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
