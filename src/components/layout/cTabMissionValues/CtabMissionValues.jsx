import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Navigation } from "swiper/core";
import Loader from "../../loader/Loader";
import { pageContext } from "../../../contexts/PageContext/PageContext";
import "./style/CtabMissionValues.css";

SwiperCore.use([Navigation]);

const CtabMissionValues = ({ marker }) => {
  const tabsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const { line, language } = useContext(pageContext);

  useEffect(() => {
    const tabNavigationLinks = Array.from(
      tabsRef.current.querySelectorAll(".c-tabs-nav__link")
    );

    const clickHandlerSetup = (link, index) => {
      link.addEventListener("click", e => {
        e.preventDefault();
        setActiveIndex(index);
      });
    };

    tabNavigationLinks.forEach((link, index) => {
      clickHandlerSetup(link, index);
    });
  }, []);

  const handleSwiperSlideChange = swiper => {
    setActiveIndex(swiper.activeIndex);
    setIsLoading(true);
  };

  const handleSwiperSlideTransitionEnd = () => {
    setIsLoading(false);
  };

  return (
    <section id="page">
      <div id="tabs" className="custom-tabs" ref={tabsRef}>
        <div className="c-tabs-nav">
          {line?.map((text, index) => (
            <a
              href="javascript:void(0);"
              className={`c-tabs-nav__link ${
                index === activeIndex ? "is-active" : ""
              }`}
              key={index}
              onClick={() => setActiveIndex(index)}>
              {text[`title_${language}`]}
            </a>
          ))}
          <div
            className="c-tab-nav-marker"
            style={{
              transform: `translateX(calc(${activeIndex} * (100% / ${line.length})))`,
            }}></div>
        </div>

        <div className="custom-swiper-team-wrapper">
          {line?.map((item, index) => (
            <div
              className={`custom-tab ${
                index === activeIndex ? "is-active" : ""
              }`}
              key={index}>
              {index === activeIndex && ( // Отображение только для активного направления
                <Swiper
                  navigation={true}
                  className="custom-mySwiper"
                  onSlideChange={handleSwiperSlideChange}
                  onTransitionEnd={handleSwiperSlideTransitionEnd}>
                  {item.team.map(content => (
                    <SwiperSlide key={content.id}>
                      <div className="custom-swiper-content">
                        <div className="custom-img-content-wrapper">
                          <img src={content.main_picture} alt="" />
                        </div>
                        <div className="custom-siper-content-left custom-swiper-left">
                          <h3
                            dangerouslySetInnerHTML={{
                              __html: content[`name_${language}`],
                            }}></h3>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: content[`status_${language}`],
                            }}></p>
                          <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? "-" : "+"}
                          </button>
                        </div>
                        <div
                          className={`team_dropdown ${
                            isOpen ? "active" : "close"
                          }`}>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: content[`experience_${language}`],
                            }}></p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CtabMissionValues;
