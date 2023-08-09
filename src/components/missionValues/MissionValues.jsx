import React from "react";
import { useContext } from "react";
import { pageContext } from "../../contexts/PageContext/PageContext";
import About from "../about/About";
import CtabCarousel from "../cTabCarousel/CtabCarousel";
import CtabMissionValues from "../layout/cTabMissionValues/CtabMissionValues";
import Loader from "../loader/Loader";

import "./style/MissionValues.css";

const MissionValues = () => {
  const { mission, language } = useContext(pageContext);
  console.log(mission);
  return (
    <>
      {mission ? (
        <div>
          <div className="mission_values_wrapper">
            <div className="mission_values_image_wrapper">
              <img src={mission.main_picture} alt="" />
            </div>
            <div className="mission_values_content">
              <h5>{mission[`title_${language}`]}</h5>
              <h6>{mission[`sub_title_${language}`]}</h6>
              <p
                dangerouslySetInnerHTML={{
                  __html: mission[`description_${language}`],
                }}></p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
};

export default MissionValues;
