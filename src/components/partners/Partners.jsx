import React, { useContext, useEffect, useRef, useState } from "react";
import { pageContext } from "../../contexts/PageContext/PageContext";
import Loader from "../loader/Loader";
import "./style/Partners.css";

const Partners = ({ marker }) => {
  const tabsRef = useRef(null);

  const { teamAll, getPartners, partners, partnersInfo, language } =
    useContext(pageContext);

  useEffect(() => {
    getPartners();
  }, []);

  console.log(partnersInfo);

  return (
    <>
      {partners && partnersInfo ? (
        <>
          <div className="custom-partners-wrapper-head">
            <h3>{partnersInfo[`sub_title_${language}`]}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: partnersInfo[`description_${language}`],
              }}></p>
          </div>
          <div className="custom-partners-tabs" ref={tabsRef}>
            {partners.map(employee => (
              <div key={employee.id} className={`partners`}>
                <img src={employee.main_picture} alt="" />

                <h4>{employee[`title_${language}`]}</h4>
                <p
                  dangerouslySetInnerHTML={{
                    __html: employee[`description_${language}`],
                  }}></p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Partners;
