import React, { useState } from "react";
import PageHeaderContent from "../../components/pageHeaderContent";
import { FaEnvelope } from "react-icons/fa"; 
import { Animate } from "react-simple-animate";
import Footer from "../../components/footer";
import "@fortawesome/fontawesome-free/css/all.min.css"; 
import "./style.scss";
const Contact = () => {
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissionMessage("Thank You For Your Submission");
  };
  const togglePhoneNumber = () => {
    setShowPhoneNumber(!showPhoneNumber);
  };
  return (
    <section id="contact" className="contact">
      <PageHeaderContent
        headerText="My Contact"
        icon={<FaEnvelope size={40} />} 
      />
      <div className="contact__content">
        <Animate
          play
          duration={1}
          delay={0}
          start={{
            transform: "translateX(-200px)",
          }}
          end={{
            transform: "translateX(0px)",
          }}
        >
          <h3 className="contact__content__header-text">Let's Talk</h3>
        </Animate>
        <Animate
          play
          duration={1}
          delay={0}
          start={{
            transform: "translateX(200px)",
          }}
          end={{
            transform: "translateX(0px)",
          }}
        >
          <form className="contact__content__form" onSubmit={handleSubmit}>
            <div className="contact__content__form__controlswrapper">
              <div>
                <input
                  required
                  name="name"
                  className="inputName"
                  type="text"
                  aria-label="Name"
                />
                <label htmlFor="name" className="nameLabel">
                  Name
                </label>
              </div>
              <div>
                <input
                  required
                  name="email"
                  className="inputEmail"
                  type="email"
                  aria-label="Email"
                />
                <label htmlFor="email" className="emailLabel">
                  Email
                </label>
              </div>
              <div>
                <textarea
                  required
                  name="description"
                  className="inputDescription"
                  rows="5"
                  aria-label="Description"
                />
                <label htmlFor="description" className="descriptionLabel">
                  Description
                </label>
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </Animate>
        {submissionMessage && (
          <div className="submissionMessage">{submissionMessage}</div>
        )}
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
      </div>
      <Footer />
    </section>
  );
};
export default Contact;



