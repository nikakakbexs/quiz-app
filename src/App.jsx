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

  const [isToggleChecked, setIsToggleChecked] = useState(false);
  const handleToggle = () => {
    setIsToggleChecked(!isToggleChecked);
  };

  useEffect(() => {
    const selectedQuestion = data.find((el) => el.title === Topic);
    setQuestion(selectedQuestion);
    setStep(0);
    setIsSubmited(false);
    setSelectedAnswer(null);
    setError("");
    setScore(0);
    setQuizCompleted(false);
  }, [Topic]);

  const handlePlayAgain = () => {
    setTopic("none");
    setQuizzInProgress(false);
    setQuestionInProgress(false);
  };

  return (
    <div className={`main ${isToggleChecked ? "dark" : ""}`}>
      {/* <header /> */}

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

      <div className="mainContainer">
        <div className="Header">
          {Question ? (
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <div className="box" style={{ backgroundColor: Question.bg }}>
                <img className="TstImg" src={Question.icon} alt="" />
              </div>
              <h1 style={{ fontSize: "24px" }}>{Question.title}</h1>
            </div>
          ) : (
            ""
          )}

          <div style={{width: "40px", height: "40px", opacity: "0"}}></div>

          <div className="toggleIcon">
            <label>
              <input
                type="checkbox"
                checked={isToggleChecked}
                onChange={handleToggle}
                style={{ display: "none" }}
              />
              <div className="swich">
                <img
                  src="./moon.png"
                  alt="Moon icon"
                  className="toggle-icon toggle-icon-moon"
                />

                <div className={`toggle ${isToggleChecked ? "checked" : ""}`}>
                  <div className="ball"></div>
                </div>

                <img
                  src="./sun.png"
                  alt="Sun icon"
                  className="toggle-icon toggle-icon-sun"
                />
              </div>
            </label>
          </div>
        </div>

        <div className="QuestionContainer">
          {quizCompleted ? (
            <>
              <div className="finalLeft">
                <h1 className="title">
                  <span style={{ fontWeight: "300" }}> Quiz completed </span>{" "}
                  <br />
                  You scored...
                </h1>
              </div>
              <div className="finalRight">
                <div className="finalContiner">
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="box"
                      style={{ backgroundColor: Question.bg }}
                    >
                      <img className="TstImg" src={Question.icon} alt="" />
                    </div>
                    <h1>{Question.title}</h1>
                  </div>
                  <p className="score">{score}</p>
                  <p className="FinalScore">
                    out of {Question.questions.length}
                  </p>
                </div>
                <button className="Submit" onClick={handlePlayAgain}>
                  <h1 style={{ color: "#fff", fontSize: "24px" }}>
                    Play Again
                  </h1>
                </button>
              </div>
            </>
          ) : (
            <>
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
                          setQuizCompleted(true);
                        }
                      } else {
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

                {QuizzInProgress && error && (
                  <div className="errorMsg">
                    <img src="Incorrect.png" alt="" className="erorImg" />
                    <p style={{ color: "red" }}> {error}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
