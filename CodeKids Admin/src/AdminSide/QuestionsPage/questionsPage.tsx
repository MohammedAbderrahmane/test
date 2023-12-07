import React, { useEffect, useState } from "react";
import Admin from "../../Backend/Admin.js";
import Question from "../../Backend/Question.js";

export default function QuestionPage() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const q = await Admin.getInstance().getQuestions();
      setQuestions(q);
    };
    fetchQuestions();
  }, []);

  console.log(questions);

  // One Question
  function QuestionFragment(params) {
    const indexOfQuestion = params.key;
    const [canEdit, setCanEdit] = useState(false);
    //const [modifiedQuestion, setModifiedQuestion] = useState(params.question);

    // the 4 responses : <ResponsesFragment>
    const ResponsesFragment = (params) => {
      // a response from the 4 responses :  <OneResponseFragment>
      const OneResponseFragment = (params) => {
        let isCorrect = false;
        params.response.isCorrect != null && params.response.isCorrect == true
          ? (isCorrect = true)
          : (isCorrect = false);
        return (
          <div id={params.key}>
            <input type="checkbox" checked={isCorrect} disabled={!canEdit} />
            <input
              disabled={!canEdit}
              defaultValue={params.response.response}
            />
            <br />
          </div>
        );
      };

      return params.responses.map((response, index) => {
        return <OneResponseFragment key={index} response={response} />;
      });
    };

    // modier button pressed
    const hadleModificationButton = () => {
      setCanEdit(!canEdit);
    };
    // supprimer button pressed
    const handleSupprimerQuestion = (params) => {
      console.log(params);
      const userDecision = window.confirm(
        "Are you sure you want to delete this question?\n" + params.question,
      );
      if (!userDecision) return;
      const tmpArray = questions.filter();
      console.log(params);

      Admin.getInstance().supprimerQuestion(params.questionID);
    };

    return (
      <>
        <div
          id={params.key}
          style={{ border: "1px solid black", margin: "10px" }}
        >
          <input
            disabled={!canEdit}
            defaultValue={params.question.language}
            onChange={(e) => {
              params.question.language = e.target.value;
            }}
          />
          <br />
          <input disabled={!canEdit} defaultValue={params.question.niveau} />
          <br />
          <input disabled={!canEdit} defaultValue={params.question.question} />
          <br />
          <ResponsesFragment responses={params.question.responses} />
          <button
            onClick={() => {
              hadleModificationButton();
            }}
          >
            {!canEdit ? "Modifier la Question" : "Annuler la Modification"}
          </button>
          {canEdit && <button>Engester la modification</button>}
          <button
            onClick={() => {
              console.log(params.question.questionID);
              handleSupprimerQuestion(params.question);
            }}
          >
            Supprimer Question
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <h1>Ajouter nouvel question :</h1>
      <NewQuestionFragment />
      <h1>Modifier ou supprimer les questions :</h1>
      {questions.map((question, index) => {
        return <QuestionFragment question={question} key={index} />;
      })}
    </>
  );
}

function NewQuestionFragment() {
  const [question, setQuestion] = useState({
    language: "",
    niveau: "",
    question: "",
    /* responses: [
        { 
          isCorrect: false,
          response: "" 
        }
      ],  */
  });
  // on peut merger responses dans question (plus de travail)
  const [responses, setResponses] = useState([
    { isCorrect: false, response: "" },
    { isCorrect: false, response: "" },
    { isCorrect: false, response: "" },
    { isCorrect: false, response: "" },
  ]);
  // pour assurer que un seul checkbox est coche
  const [correct, setCorrect] = useState("0");

  const handleCheckBoxChange = (index) => {
    setCorrect(index);
    setResponses(
      responses.map((response, i) => ({
        ...response,
        isCorrect: i == parseInt(index),
      })),
    );
    console.log(responses);
  };

  const handleResponseChange = (index, value) => {
    setResponses(
      responses.map((response, i) => ({
        ...response,
        response: i == index ? value : response.response,
      })),
    );
    console.log(responses);
  };

  const handleAjouterQuestion = (submitEvent) => {
    // must have to not refersh page
    submitEvent.preventDefault();
    const newQuestion = { ...question, responses };
    console.log(newQuestion);

    Admin.getInstance().ajouterQuestion(newQuestion);
  };

  // NOT USEFULL FOR NOW (can be used to shorten code)
  function NewResponse() {
    return (
      <>
        <input type="checkbox" />
        <input type="text" placeholder="la reponse" />
        <br />
      </>
    );
  }

  return (
    <form>
      <label>la question :</label>
      <input
        type="text"
        onChange={(e) => setQuestion({ ...question, question: e.target.value })}
      />
      <br />
      <select
        onChange={(e) => setQuestion({ ...question, niveau: e.target.value })}
      >
        <option value="facile">facile</option>
        <option value="moyen">moyen</option>
        <option value="difficile">difficile</option>
      </select>
      <br />
      <label>la langue :</label>
      <select
        onChange={(e) => setQuestion({ ...question, language: e.target.value })}
      >
        <option value="C">C</option>
        <option value="Java">Java</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
      </select>
      <br />
      <div>
        <input
          type="checkbox"
          checked={correct == "0"}
          onChange={() => handleCheckBoxChange("0")}
        />
        <input
          type="text"
          placeholder="la reponse 0"
          onChange={(e) => handleResponseChange(0, e.target.value)}
        />
        <br />
        <input
          type="checkbox"
          checked={correct == "1"}
          onChange={() => handleCheckBoxChange("1")}
        />
        <input
          type="text"
          placeholder="la reponse 1"
          onChange={(e) => handleResponseChange(1, e.target.value)}
        />
        <br />
        <input
          type="checkbox"
          checked={correct == "2"}
          onChange={() => handleCheckBoxChange("2")}
        />
        <input
          type="text"
          placeholder="la reponse 2"
          onChange={(e) => handleResponseChange(2, e.target.value)}
        />
        <br />
        <input
          type="checkbox"
          checked={correct == "3"}
          onChange={() => handleCheckBoxChange("3")}
        />
        <input
          type="text"
          placeholder="la reponse 3"
          onChange={(e) => handleResponseChange(3, e.target.value)}
        />
        <br />
      </div>
      <button
        onClick={(e) => {
          handleAjouterQuestion(e);
        }}
      >
        Ajouter Question au base de données
      </button>
    </form>
  );
}
