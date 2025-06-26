import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import PageHeaderContent from "../../components/pageHeaderContent";
import { Animate } from "react-simple-animate";
import "./style.scss";
import { DiApple, DiAndroid } from "react-icons/di";
import { FaDev, FaDatabase } from "react-icons/fa";
import Footer from "../../components/footer";
const personalDetails = [
  {
    label: "Name",
    value: "Shashank Pandey",
  },
  {
    label: "Age",
    value: "19",
  },
  {
    label: "Address",
    value: "Gorakhpur, Uttar-Pradesh, India",
  },
  {
    label: "Email",
    value: "shashankpandey201085@gmail.com",
  },
  {
    label: "Contact No",
    value: "+91 8400197244",
  },
];
const jobSummary = "As a passionate B.Tech Computer Science student, I’ve honed my skills in web development and data structures and algorithms. With proficiency in HTML, CSS, Java, JavaScript, Node.js, React.js, and API, I craft responsive and user-centric web applications. My problem-solving toolkit includes a strong command of Java, which I utilize to tackle complex algorithmic challenges. Eager to contribute and grow in a dynamic tech environment, I am on the lookout for opportunities to innovate and excel";
const About = () => {
  return (
    <section id="about" className="about">
      <PageHeaderContent
        headerText="About Me"
        icon={<BsInfoCircleFill size={40} />}
      />
      <div className="about__content">
        <div className="about__content__personalWrapper">
          <Animate
            play
            duration={1.5}
            delay={1}
            start={{ transform: "translateX(-900px)" }}
            end={{ transform: "translatex(0px)" }}
          >
            <h3>Full Stack Web Developer</h3>
            <p>{jobSummary}</p>
          </Animate>

          <Animate
            play
            duration={1.5}
            delay={1}
            start={{ transform: "translateX(500px)" }}
            end={{ transform: "translatex(0px)" }}
          >
            <h3 className="personalInformationHeaderText">
              Personal Information
            </h3>
            <ul>
              {personalDetails.map((item, i) => (
                <li key={i}>
                  <span className="title">{item.label}</span>
                  <span className="value">{item.value}</span>
                </li>
              ))}
            </ul>
          </Animate>
        </div>
        <div className="about__content__servicesWrapper">
          <Animate
            play
            duration={1.5}
            delay={1}
            start={{ transform: "translateX(600px)" }}
            end={{ transform: "translatex(0px)" }}
          >
            <div className="about__content__servicesWrapper__innerContent">
              <div>
                <FaDev size={60} color="var(--yellow-theme-main-color)" />
              </div>
              <div>
                <DiAndroid size={60} color="var(--yellow-theme-main-color)" />
              </div>
              <div>
                <FaDatabase size={60} color="var(--yellow-theme-main-color)" />
              </div>
              <div>
                <DiApple size={60} color="var(--yellow-theme-main-color)" />
              </div>
            </div>
          </Animate>
        </div>
      </div>
      <Footer />
    </section>
  );
};
export default About;
