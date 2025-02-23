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
  const [Question, setQuestion] = useState(data);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setQuestion(data.find((el) => el.title === Topic));
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
        <Txt />
        <div className="AnswersBox">
          {QuizzInProgress
            ? Question
              ? Question.questions[step].options.map((el, i) => (
                  <AnswButton
                    BoxColor="#F4F6FA"
                    img={null}
                    Number={
                      i == 0
                        ? "A"
                        : i == 1
                        ? "B"
                        : i == 2
                        ? "C"
                        : i == 3
                        ? "D"
                        : ""
                    }
                    Answr={el}
                    IsSubmited={IsSubmited}
                    QuestionInProgress={QuestionInProgress}
                    setQuizzInProgress={setQuizzInProgress}
                    IsCorrect={
                      Question.questions[step].answer == el ? true : false
                    }
                  />
                ))
              : null
            : data.map((el) => (
                <AnswButton
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
              setIsSubmited(true);
              setQuestionInProgress(false);
            }}
            style={{
              display: `${QuizzInProgress ? "" : "none"}`,
            }}
          >
            <h1 style={{ color: "#fff", fontWeight: "500" }}>
              {IsSubmited ? "Next Question" : "Submit Answer"}
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
