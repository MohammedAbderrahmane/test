import "./adminMainPage.css";

import { Navigate, Link } from "react-router-dom";

import Admin from "../../Backend/Admin.js";

import AuthPage from "../AuthPage/authPage";
import QuestionPage from "../QuestionsPage/questionsPage";

// params = {setCurrentPage}
export default function AdminMainPage() {
  // Disconnecting
  function handleLogout() {
    Admin.deConnecter();
    localStorage.clear();
  }
  // open Question list

  return (
    <>
      <header>
        <h1>Page d'administration</h1>
      </header>

      <main>
        <section className="questions">
          <h2>Voir la liste de toutes les questions</h2>
          <ul>
            <li>
              <Link to="/questions">La liste des questions</Link>
            </li>
          </ul>
        </section>

        <section className="avis">
          <h2>Gérer les avis</h2>
          <ul>
            <li>
              <a href="">Liste des avis</a>
            </li>
          </ul>
        </section>
      </main>

      <div className="profile">
        <img src="" alt="Photo de l'administrateur" />
        <h3>Admin</h3>
        <p>Bonjour Administrateur</p>
        <button onClick={() => alert("TODO")}>Modifier le profil</button>
        <button onClick={() => handleLogout()}>Deconnexion</button>
      </div>
    </>
  );
}
