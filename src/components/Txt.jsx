import React from "react";
import "./Txt.css";

const Txt = ({ QuizzInProgress, question, step }) => {
  return (
    <div className="container">
      {QuizzInProgress && question ? (
        <>
          <div className="topicInfo">
            <img src={question.icon} alt={question.title} className="topicIcon" />
            <h2 className="topicTitle">{question.title}</h2>
          </div>
          <p className="smallParagraph">
            Question {step + 1} of {question.questions.length}
          </p>
          <h1 style={{ fontSize: "40px" }}>
            {question.questions[step].question}
          </h1>
          <div className="ProgressBar">
            <div
              className="innerBar"
              style={{
                width: `${(100 * (step + 1)) / question.questions.length}%`,
              }}
            ></div>
          </div>
        </>
      ) : (
        <>
          <p className="smallParagraph" style={{ display: "none" }}>
            Question 0 of 10
          </p>
          <h1 style={{ fontSize: "50px" }}>
            <span style={{ fontWeight: "300" }}> Welcome to the </span>
            <br /> Frontend Quiz!
          </h1>
          <p className="smallParagraph" style={{ marginTop: "48px" }}>
            Pick a subject to get started.
          </p>
        </>
      )}
    </div>
  );
};

export default Txt;