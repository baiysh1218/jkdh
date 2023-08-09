import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Navigation } from "swiper/core";
import "../cTabCarousel/style/cTabCarousel.css";
import { pageContext } from "../../contexts/PageContext/PageContext";
import Loader from "../loader/Loader";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

SwiperCore.use([Navigation]);

const CareerCTab = ({ marker }) => {
  const tabsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { language, vacanciesAll } = useContext(pageContext);

  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    const tabNavigationLinks = Array.from(
      tabsRef.current.querySelectorAll(".c-tabs-nav__link")
    );

    const goToTab = index => {
      if (
        index >= 0 &&
        index !== activeIndex &&
        index < tabNavigationLinks.length
      ) {
        tabNavigationLinks[activeIndex].classList.remove("is-active");
        tabNavigationLinks[index].classList.add("is-active");

        setActiveIndex(index);
      }
    };

    const clickHandlerSetup = (link, index) => {
      link.addEventListener("click", e => {
        e.preventDefault();
        goToTab(index);
      });
    };

    tabNavigationLinks.forEach((link, index) => {
      clickHandlerSetup(link, index);
    });

    return () => {
      // Clean up the event listeners when the component unmounts
      tabNavigationLinks.forEach((link, index) => {
        link.removeEventListener("click", () => goToTab(index));
      });
    };
  }, [activeIndex]);

  const handleSwiperSlideChange = swiper => {
    setActiveIndex(swiper.activeIndex);
    setIsLoading(true);
  };

  const handleSwiperSlideTransitionEnd = () => {
    setIsLoading(false);
  };

  console.log("VACANCIES", vacanciesAll);

  return (
    <>
      <section id="page">
        <div id="tabs" className="c-tabs" ref={tabsRef}>
          <div className="c-tabs-nav">
            {vacanciesAll?.results &&
              vacanciesAll?.results.map((vacancies, index) => (
                <a
                  href="javascript:void(0);"
                  className={`c-tabs-nav__link ${
                    index === activeIndex ? "is-active" : ""
                  }`}
                  key={index}
                  onClick={() => setActiveIndex(index)}>
                  {vacancies[`title_${language}`]}
                </a>
              ))}
            <div
              className="c-tab-nav-marker"
              style={{
                transform: `translateX(calc(${activeIndex} * (100% / ${
                  vacanciesAll?.results?.length || 1
                })))`,
              }}></div>
          </div>
          {vacanciesAll?.results.map((item, index) => (
            <div
              className={`c-tab career_img ${
                index === activeIndex ? "is-active" : ""
              }`}
              key={index}>
              <img src={item.main_picture} alt="" />
              <h4>{item[`title_${language}`]}</h4>
              <p
                dangerouslySetInnerHTML={{
                  __html: item[`description_${language}`],
                }}></p>
              <button
                onClick={() => {
                  navigate(`/resume/${item.id}`);
                }}>
                {t("career.more")}
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CareerCTab;
