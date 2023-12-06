import { db } from "../Config/config-firebase";
import {
  collection,
  getDocs,
  addDoc,
  limit,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Question from "./Question";

export default class Admin {
  static #instance;
  docRef;
  questions = [];

  constructor(params) {
    if (Admin.#instance) throw new Error("New instance cannot be created!");
    this.docRef = params.ref;
  }

  // params = {email, password}
  static async seIdentifier(params) {
    await getDocs(collection(db, "Admin"))
      .then((querySnapShot) => {
        if (!querySnapShot.empty) {
          querySnapShot.forEach((docSnapShot) => {
            if (
              docSnapShot.data().email == params.email &&
              docSnapShot.data().password == params.password
            ) {
              Admin.#instance = new Admin(docSnapShot.ref);
              console.log("login success");
            } else console.log("login filled");
          });
        }
      })
      .catch(() => {});
  }

  static deConnecter() {
    Admin.#instance = null;
  }

  static getInstance() {
    if (!Admin.#instance) {
      throw new Error("Instance does not exist!");
    }
    return Admin.#instance;
  }

  static isAdminConnected() {
    return Admin.#instance != null;
  }

  /* params = 
  {
    questionId
    niveau,
    language,
    reponses={
      {reponse,isCorrect},
      {reponse,isCorrect},
      {reponse,isCorrect},
      {reponse,isCorrect}
    } 
  }
  */

  // max = number of questions to get
  async getQuestions(max) {
    this.questions = [];
    await getDocs(
      collection(db, "Questions"),
      max == -1 ? limit(999) : limit(max),
    )
      .then((querySnapShot) => {
        querySnapShot.forEach((docSnapShot) => {
          this.questions.push(
            new Question({
              questionId: docSnapShot.id,
              niveau: docSnapShot.data().niveau,
              language: docSnapShot.data().language,
              question: docSnapShot.data().question,
              responses: docSnapShot.data().responses,
            }),
          );
        });
      })
      .catch(() => {
        console.log("failled to load questions");
      });
    return this.questions;
  }
  // params = question {niveau, language, question, options}
  async ajouterQuestion(params) {
    await addDoc(collection(db, "Questions"), params)
      .then(() => {
        console.log("Question ajoutéé");
      })
      .catch(() => {
        console.log("Question non ajouté avec echeck!");
      });
  }
  // params = rank , question {questionId,newNiveau, newLanguage, newQuestion, newReponses}
  async modifierQuestion(params) {
    this.questions.filter((index) => {
      index != params.rank;
    });
    await updateDoc(doc(db, "Questions", params.questionId), params)
      .then(() => {
        console.log("Question modifiée");
      })
      .catch(() => {
        console.log("Question non modifiée avec echeck!");
      });
  }
  // params = {questionId, ...}
  async supprimerQuestion(params) {
    await deleteDoc(doc(db, "Questions", params.questionId))
      .then(() => {
        console.log("Question supprimée");
      })
      .catch(() => {
        console.log("Question non supprimée avec echeck!");
      });
  }
}
