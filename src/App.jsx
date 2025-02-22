import { useState } from "react";
import "./App.css";
import AnswButton from "./components/AnswButton";
import Txt from "./components/Txt";

function App() {

  const [IsSubmited, setIsSubmited] = useState(false)
  const [QuestionInProgress, setQuestionInProgress] = useState(false);

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
          <AnswButton
            BoxColor="#FFF1E9"
            img="./HTML.png"
            Number=""
            Answr="HTML"
            IsSubmited={IsSubmited}
            QuizzStarted={QuestionInProgress}
            IsCorrect={true}
          />
          <AnswButton
            BoxColor="#E0FDEF"
            img="./CSS.png"
            Number=""
            Answr="CSS"
            QuizzStarted={QuestionInProgress}
            IsSubmited={IsSubmited}
          />
          <AnswButton
            BoxColor="#EBF0FF"
            img="./JS.png"
            Number=""
            Answr="Javascript"
            QuizzStarted={QuestionInProgress}
            IsSubmited={IsSubmited}
          />
          <AnswButton
            BoxColor="#F6E7FF"
            img="./ACC.png"
            Number=""
            Answr="Accessibility"
            QuizzStarted={QuestionInProgress}
            IsSubmited={IsSubmited}
          />
          <button
            className="Submit"
            onClick={() => {
              setIsSubmited(true);
            }}
            style={{
              display: `${QuestionInProgress ? "" : "none"}`,
            }}
          >
            <h1 style={{ color: "#fff", fontWeight: "500" }}>Submit Answer</h1>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
