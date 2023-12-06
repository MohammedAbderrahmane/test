import "./adminMainPage.css";
import AuthPage from "../AuthPage/authPage";
import Admin from "../../Backend/Admin.js";
import QuestionPage from "../QuestionsPage/questionsPage";

// params = {setCurrentPage}
export default function AdminMainPage(params) {
  function handleLogout() {
    Admin.deConnecter();
    params.setCurrentPage(<AuthPage setCurrentPage={params.setCurrentPage} />);
  }
  function goToQuestionList() {
    params.setCurrentPage(
      <QuestionPage setCurrentPage={params.setCurrentPage} />,
    );
  }

  return (
    <>
      <header>
        <h1>Page d'administration</h1>
      </header>

      <main>
        <section className="comptes">
          <h2>Gérer les comptes des utilisateurs</h2>
          <ul>
            <li>
              <a href="">Liste des comptes</a>
            </li>
            <li>
              <a href="">Ajouter un compte</a>
            </li>
            <li>
              <a href="">Modifier un compte</a>
            </li>
            <li>
              <a href="">Supprimer un compte</a>
            </li>
          </ul>
        </section>

        <section className="questions">
          <h2>Voir la liste de toutes les questions</h2>
          <ul>
            <li>
              <a onClick={() => goToQuestionList()}>Liste des questions</a>
            </li>
            <li>
              <a href="">Ajouter une question</a>
            </li>
            <li>
              <a href="">Modifier une question</a>
            </li>
            <li>
              <a href="">Supprimer une question</a>
            </li>
          </ul>
        </section>

        <section className="avis">
          <h2>Gérer les avis</h2>
          <ul>
            <li>
              <a href="">Liste des avis</a>
            </li>
            <li>
              <a href="">Ajouter un avis</a>
            </li>
            <li>
              <a href="">Modifier un avis</a>
            </li>
            <li>
              <a href="">Supprimer un avis</a>
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
