import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import User from "/src/BackEnd/User";
import { UserContext } from "/src/App";
export default function MainPage() {
  return (
    <div>
      <Hello />
      <About />
      <Teachers />
      <Contact />
    </div>
  );
}

function Hello() {
  const { connected, setConnected } = useContext(UserContext);
  return (
    <section className="hero_section ">
      <div className="hero-container container">
        <div className="hero_detail-box">
          <h3>
            Bienvenue sur <br />
            CodeKids-Learning
          </h3>
          <h1>Apprendre la Programmation en s'Amusant !</h1>
          <div className="hero_btn-continer">
            <Link
              to={connected ? "/QCM" : "/Login"}
              className="call_to-btn btn_white-border"
              id="startHere"
            >
              <span>Start here !</span>
            </Link>
          </div>
        </div>
        <div className="hero_img-container">
          <div>
            <img src="\src\Imgs\hero.png" alt="" className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <div>
      <section className="about_section layout_padding">
        <div className="container">
          <h2 className="main-heading ">About CodeKids</h2>
          <p className="text-center">
            CodeKids-Learning" is an educational platform specially designed for
            children, providing an interactive and playful experience in the
            exciting world of programming. We are dedicated to delivering
            stimulating quizzes based on Multiple-Choice Questions (MCQs),
            allowing young learners to develop their programming skills while
            having fun.
          </p>
          <div className="about_img-box ">
            <img src="\src\Imgs\kids.jpg" alt="" className="img-fluid w-100" />
          </div>
          <div className="d-flex justify-content-center mt-5">
            <a href="" className="call_to-btn  ">
              <span>Read More</span>
            </a>
          </div>
        </div>
      </section>
      <section className="curved"></section>
    </div>
  );
}

function Teachers() {
  return (
    <>
      <section className="teacher_section layout_padding-bottom">
        <div className="container">
          <h2 className="main-heading ">Our Teachers</h2>
          <p className="text-center">
            Our dedicated educators bring expertise and passion to nurture young
            minds in programming. With a commitment to a dynamic learning
            environment and innovative teaching methods, we focus on fostering
            creativity and critical thinking, inspiring the next generation of
            tech enthusiasts.
            <br />
            Join our exciting learning adventure led by experienced and
            enthusiastic teaching professionals!
          </p>
          <div className="teacher_container layout_padding2">
            <div className="card-deck">
              <div className="card">
                <img
                  className="card-img-top"
                  src="/src/Imgs/h7yb5ttljyr91.jpg"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    Mohammed <br />
                    Abderrahmane
                  </h5>
                </div>
              </div>
              <div className="card">
                <img
                  className="card-img-top"
                  src="/src/Imgs/ThomasShelby.jpg"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Aminho</h5>
                </div>
              </div>
              <div className="card">
                <img
                  className="card-img-top"
                  src="/src/Imgs/ThomasShelby.jpg"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Aminho</h5>
                </div>
              </div>
              <div className="card">
                <img
                  className="card-img-top"
                  src="/src/Imgs/ThomasShelby.jpg"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Aminho</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <a href="" className="call_to-btn">
              <span>See More</span>
              <img src="images/right-arrow.png" alt="" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Contact() {
  return (
    <section className="contact_section layout_padding-bottom">
      <div className="container">
        <h2 className="main-heading">Contact Now</h2>
        <p className="text-center">n7taj p hna mnb3d</p>
        <div className="">
          <div className="contact_section-container">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="contact-form">
                  <form>
                    <div>
                      <input type="text" placeholder="Name" />
                    </div>
                    <div>
                      <input type="text" placeholder="Subject" />
                    </div>
                    <div>
                      <input type="email" placeholder="Email" />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Message"
                        className="input_message"
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="call_to-btn">
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
