import React, { useState, useEffect } from "react";
import "./AnswButton.css";

const AnswButton = ({
  Answr,
  Number,
  img,
  BoxColor,
  IsCorrect,
  IsSubmited,
  QuestionInProgress,
  setTopic,
  setQuizzInProgress,
  setQuestionInProgress,
}) => {
  const [isCliked, setisCliked] = useState(false);

  return (
    <div>
      <button
        className="AnswButton"
        style={{
          border: `${
            isCliked & IsSubmited & IsCorrect
              ? "3px solid #26D782"
              : isCliked & IsSubmited & !IsCorrect
              ? "3px solid #FF5252"
              : isCliked & !IsSubmited
              ? "3px solid #A729F5"
              : "3px solid transparent"
          }`,
        }}
        onClick={(e) => {
          if (QuestionInProgress) {
            setisCliked(!isCliked);
          } else {
            setTopic(Answr);
            setQuizzInProgress(true);
            setQuestionInProgress(true);
          }
        }}
      >
        <div
          className="box"
          id="box"
          style={{
            backgroundColor: `${
              IsCorrect & IsSubmited & isCliked
                ? "#26D782"
                : !IsCorrect & IsSubmited & isCliked
                ? "#EE5454"
                : isCliked & !IsSubmited
                ? "#A729F5"
                : BoxColor
            }`,
          }}
        >
          <img
            className="TstImg"
            src={img}
            alt=""
            style={{
              width: `${img == "./CSS.png" ? "16px" : "22px"}`,
              height: "22px",
              display: `${img == null ? "none" : ""}`,
            }}
          />
          {Number}
        </div>
        <h1>{Answr}</h1>
        <img
          className="CorrectImg"
          src="./Correct.png"
          alt=""
          style={{
            opacity: `${
              IsCorrect & !IsSubmited & isCliked
                ? "0"
                : IsCorrect & IsSubmited & isCliked
                ? "1"
                : IsCorrect & IsSubmited & !isCliked
                ? "1"
                : "0"
            }`,
          }}
        />
        <img
          className="IncorrectImg"
          src="./Incorrect.png"
          alt=""
          style={{
            opacity: `${
              !IsCorrect & !IsSubmited & isCliked
                ? "0"
                : !IsCorrect & IsSubmited & isCliked
                ? "1"
                : "0"
            }`,
          }}
        />
      </button>
    </div>
  );
};

export default AnswButton;
