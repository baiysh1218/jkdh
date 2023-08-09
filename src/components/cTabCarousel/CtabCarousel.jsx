import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "./style/cTabCarousel.css";
import SwiperCore, { Navigation } from "swiper/core";
import { pageContext } from "../../contexts/PageContext/PageContext";
import Loader from "../loader/Loader";

SwiperCore.use([Navigation]);

const CtabCarousel = ({ marker }) => {
  const tabsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { line, language } = useContext(pageContext);

  console.log(line);

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
  }, [activeIndex]);

  const handleSwiperSlideChange = swiper => {
    setActiveIndex(swiper.activeIndex);
    setIsLoading(true);
  };

  const handleSwiperSlideTransitionEnd = () => {
    setIsLoading(false);
  };

  return (
    <section id="page">
      <div id="tabs" className="c-tabs" ref={tabsRef}>
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

        {line?.map((item, index) => {
          if (typeof item === "object") {
            return (
              <div
                className={`c-tab ${index === activeIndex ? "is-active" : ""}`}
                key={index}>
                <Swiper
                  navigation={true}
                  className="mySwiper"
                  onSlideChange={handleSwiperSlideChange}
                  onTransitionEnd={handleSwiperSlideTransitionEnd}>
                  {item.extra_fields.map((content, contentIndex) => {
                    if (typeof content === "object") {
                      return (
                        <SwiperSlide key={content.id}>
                          <div className="swiper_content">
                            <div className="siper_content_left">
                              <div className="swiper_left_img_wrapper">
                                <img
                                  id="swiper_img_left"
                                  src={content.second_picture}
                                  alt=""
                                />
                              </div>
                              <div className="swiper_ccontent_left">
                                <h3
                                  dangerouslySetInnerHTML={{
                                    __html: content[`sub_title_${language}`],
                                  }}></h3>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: content[`description_${language}`],
                                  }}></p>
                              </div>
                            </div>
                            <div className="swiper_content_right">
                              <img src={content?.picture} alt="" />
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    }
                    return null;
                  })}
                </Swiper>
                {isLoading && <Loader />}
              </div>
            );
          }
          return null;
        })}
      </div>
    </section>
  );
};

export default CtabCarousel;
