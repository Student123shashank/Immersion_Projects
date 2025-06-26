import React, { useState } from "react";
import PageHeaderContent from "../../components/pageHeaderContent";
import { FaBriefcase } from "react-icons/fa"; 
import ImageOne from "../../Images/Image1.png";
import ImageTwo from "../../Images/Image2.png";
import ImageThree from "../../Images/Image3.png";
import Footer from "../../components/footer";
import "./style.scss";
const portfolioData = [
  {
    id: 1,
    name: "Calculator",
    image: ImageOne,
    link: "https://main-flow-services-and-technologies-task5.vercel.app/",
    category: "Development",
  },
  {
    id: 2,
    name: "Todo-App",
    link: "https://code-alpha-task1.vercel.app/",
    image: ImageTwo,
    category: "Development",
  },
  {
    id: 3,
    name: "Responsive Webpage",
    image: ImageThree,
    link: "https://main-flow-services-and-technologies-task-03.vercel.app/",
    category: "Design",
  },
];

const filterData = [
  {
    filterId: 1,
    label: "All",
  },
  {
    filterId: 2,
    label: "Development",
  },
  {
    filterId: 3,
    label: "Design",
  },
];
const Portfolio = () => {
  const [filteredValue, setFilteredValue] = useState(1);
  const [hoveredValue, setHoveredValue] = useState(null);

  function handleFilter(currentId) {
    setFilteredValue(currentId);
  }
  function handleHover(index) {
    setHoveredValue(index);
  }
  const filteredItems =
    filteredValue === 1
      ? portfolioData
      : portfolioData.filter((item) =>
          filteredValue === 2
            ? item.category === "Development"
            : item.category === "Design"
        );
  return (
    <section id="portfolio" className="portfolio">
      <PageHeaderContent
        headerText="My Portfolio"
        icon={<FaBriefcase size={40} />} 
      />
      <div className="portfolio__content">
        <ul className="portfolio__content__filter">
          {filterData.map((item) => (
            <li
              className={item.filterId === filteredValue ? "active" : ""}
              onClick={() => handleFilter(item.filterId)}
              key={item.filterId}
            >
              {item.label}
            </li>
          ))}
        </ul>
        <div className="portfolio__content__cards">
          {filteredItems.map((item, index) => (
            <div
              className="portfolio__content__cards__item"
              key={`cardItem${item.name.trim()}`}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHover(null)}
            >
              <div className="portfolio__content__cards__item__img-wrapper">
                <a href={item.link} aria-label={item.name}>
                  <img alt={item.name} src={item.image} />
                </a>
              </div>
              <div className="overlay">
                {index === hoveredValue && (
                  <div>
                    <p>{item.name}</p>
                    <button onClick={() => window.location.href = item.link}>Visit</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
};
export default Portfolio;




