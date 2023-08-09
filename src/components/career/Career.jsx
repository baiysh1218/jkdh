import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { pageContext } from "../../contexts/PageContext/PageContext";
import CardAnimation from "../layout/cardAnimation/CardAnimation";
import Loader from "../loader/Loader";
import CareerCTab from "./CareerCTab";
import "./style/Career.css";

const Career = () => {
  const { career, language, vacancies } = useContext(pageContext);

  const { t } = useTranslation();

  const [animatedCards, setAnimatedCards] = useState([]);

  useEffect(() => {
    vacancies();
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const cardElements = document.querySelectorAll(".card_animation");

    cardElements.forEach((cardElement, index) => {
      const cardTop = cardElement.offsetTop;
      const cardHeight = cardElement.offsetHeight;
      const scrollOffset = window.innerHeight * 0.5;

      if (
        scrollTop >= cardTop - scrollOffset &&
        scrollTop <= cardTop + cardHeight - scrollOffset &&
        !animatedCards.includes(index)
      ) {
        setAnimatedCards(prevState => [...prevState, index]);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {career ? (
        <>
          <div className="career_main_wrapper">
            <div className="media_content">
              {career.main_picture ? (
                <img src={career.main_picture} alt={career.title} />
              ) : (
                <video autoPlay muted loop id="career-video">
                  <source src={career.main_video} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
          <div className="company_main_wrapper">
            <div className="company_content_text_wrapper">
              <h2>{career[`title_${language}`]}</h2>
              {/* Заголовок компании */}
              <p
                dangerouslySetInnerHTML={{
                  __html: career[`description_${language}`],
                }}></p>
              {/* Подзаголовок "О компании" */}
            </div>
            <div className="company_main_card">
              {career.images.map((cardItem, index) => (
                <div
                  className={`card_animation ${
                    animatedCards.includes(index) ? "animate" : ""
                  }`}
                  style={{ margin: `${index * 10}px 0` }}
                  key={index}>
                  <img src={cardItem.picture} alt={career.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="vacancies">
            <CareerCTab />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Career;
