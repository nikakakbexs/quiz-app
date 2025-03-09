import React, { useState } from "react";
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
  selected,
  onSelect,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return ( 
  <>  
  
  

  
    <div>
      
      <button
        className="AnswButton"
        style={{
          border: `${
            selected && IsSubmited && IsCorrect
              ? "3px solid #26D782"
              : selected && IsSubmited && !IsCorrect
              ? "3px solid #FF5252"
              : selected && !IsSubmited
              ? "3px solid #A729F5"
              : "3px solid transparent"
          }`,
        }}
        onClick={() => {
          if (QuestionInProgress) {
            onSelect();
          } else {
            setTopic(Answr);
            setQuizzInProgress(true);
            setQuestionInProgress(true);
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="box"
          style={{
            backgroundColor: `${
              IsCorrect && IsSubmited && selected
                ? "#26D782"
                : !IsCorrect && IsSubmited && selected
                ? "#EE5454"
                : selected && !IsSubmited
                ? "#A729F5"
                : !selected && !IsSubmited && isHovered && QuestionInProgress
                ? "#F6E7FF"
                : BoxColor
            }`,
            color: `${
              !selected && !IsSubmited && isHovered && QuestionInProgress
                ? "#A729F5"
                : ""
            }`,
          }}
        >
          <img
            className="TstImg"
            src={img}
            alt=""
            style={{
              width: `${img === "./CSS.png" ? "16px" : "22px"}`,
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
              selected && IsSubmited && IsCorrect
                ? "1"
                : !selected && IsSubmited && IsCorrect
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
            opacity: `${selected && IsSubmited && !IsCorrect ? "1" : "0"}`,
          }}
        />
      </button>
    </div>
    </>
  );
};

export default AnswButton;
