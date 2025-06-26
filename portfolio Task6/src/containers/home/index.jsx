import React, { useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Animate } from "react-simple-animate";
import "./style.scss";
const Footer = lazy(() => import("../../components/footer"));
const Home = () => {
  const navigate = useNavigate();
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const handleNavigateToContactMePage = () => {
    navigate("/contact");
  };
  const handleOpenResume = () => {
    window.open("https://drive.google.com/file/d/11VBk4Gbu8rujsXLEEJ7h11QXG0e2ifoo/view?usp=sharing", "_blank");
  };
  const togglePhoneNumber = () => {
    setShowPhoneNumber(!showPhoneNumber);
  };
  return (
    <section id="home" className="home">
      <div className="home__text-wrapper">
        <h1>Hello, I'm Shashank Pandey <br /> Full Stack Web Developer</h1>
      </div>
      <Animate
        play
        duration={1.5}
        delay={1}
        start={{ transform: "translateY(550px)" }}
        end={{ transform: "translatex(0px)" }}
      >
        <div className="home__buttons">
          <button onClick={handleNavigateToContactMePage} aria-label="Hire Me">Hire Me</button>
          <button onClick={handleOpenResume} aria-label="Open Resume">Download Resume</button>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/profile.php?id=100034347043317" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.linkedin.com/in/shashank-pandey-37863a287/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://www.instagram.com/shashank_pandey__________/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://x.com/shashank23_07?s=21" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://github.com/Student123shashank" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://t.me/Shashank_888" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-telegram-plane"></i>
          </a>
          <a href="https://wa.me/+918400197244" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp"></i>
          </a>
          <div onClick={togglePhoneNumber} className="contact-icon">
            <i className="fas fa-phone"></i>
          </div>
          {showPhoneNumber && (
            <div className="phone-number">+91-8400197244</div>
          )}
        </div>
      </Animate>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </section>
  );
};
export default Home;










