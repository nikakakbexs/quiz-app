import React from "react";
import "./Txt.css";

const Txt = () => {
  return (
    <div className="container">
      <p className="smallParagraph" style={{ display: "none" }}>
        Question 0 of 10
      </p>
      <h1 style={{ fontSize: "50px" }}>
        <span style={{ fontWeight: "300" }}> Welcome to the </span> <br />{" "}
        Frontend Quiz!
      </h1>
      <p className="smallParagraph" style={{ marginTop: "48px" }}>
        Pick a subject to get started.
      </p>

      <div className="ProgressBar" style={{ display: "none" }}></div>
    </div>
  );
};

export default Txt;
