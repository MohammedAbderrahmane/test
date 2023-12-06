import React, { useEffect, useState } from "react";
import Admin from "../../Backend/Admin.js";
import Question from "../../Backend/Question.js";

export default function QuestionPage(params) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const q = await Admin.getInstance().getQuestions();
      setQuestions(q);
    };
    fetchQuestions();
  }, []);

  console.log(questions);

  return (
    <>
      {questions.map((question, index) => {
        return <QuestionFragment question={question} key={index} />;
      })}
    </>
  );
}

function QuestionFragment(params) {
  // TODO : problem in here
  return (
    <>
      <div
        id={params.key}
        style={{ border: "1px solid black", margin: "10px" }}
      >
        <input disabled={true} value={params.question.language} />
        <br />
        <input disabled={true} value={params.question.niveau} />
        <br />
        <input disabled={true} value={params.question.question} />
        <br />
        <ResponseFragment responses={params.question.responses} />
        <button>Modifier Question</button>
        <button>Supprimer Question</button>
      </div>
    </>
  );
}

function ResponseFragment(params) {
  return params.responses.map((response, index) => {
    return <OneResponseFragment key={index} response={response} />;
  });
}

function OneResponseFragment(params) {
  let isCorrect = false;
  params.response.iscorrect == null ? (isCorrect = false) : (isCorrect = true);
  return (
    <div id={params.key}>
      <input type="checkbox" checked={isCorrect} />
      <input disabled={true} value={params.response.response} />
      <br />
    </div>
  );
}
