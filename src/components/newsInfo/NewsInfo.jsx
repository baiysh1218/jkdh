import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pageContext } from "../../contexts/PageContext/PageContext";
import "./style/NewsInfo.css";

const NewsInfo = () => {
  const { postsAll, language } = useContext(pageContext);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [postSliced, setPostsSliced] = useState([]);
  const [random, setRandom] = useState({});

  const navigate = useNavigate();

  const handleSlicePosts = () => {
    setPostsSliced(postsAll.slice(0, 3));
  };

  useEffect(() => {
    handleSlicePosts();
    const randomIndex = Math.floor(Math.random() * postsAll?.length);
    setRandom(postsAll[randomIndex]);
  }, [postsAll]);

  const handleMouseEnter = () => {
    setIsOverlayVisible(true);
  };

  const handleMouseLeave = () => {
    setIsOverlayVisible(false);
  };

  function truncate(text) {
    const cleanText = text.replace(/<[^>]+>|["']/g, ""); // Удалить все HTML-теги и кавычки
    const result = cleanText.split(" ").slice(0, 8).join(" ");
    return <p>{result}...</p>;
  }

  return (
    <>
      <section
        className="news_wrapper"
        style={{ backgroundImage: `url(${random?.image})` }}>
        {postSliced?.map(item => (
          <div
            className="news_content_table"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            key={item.id} // Don't forget to provide a unique key for each mapped element
          >
            <div className="news_content_item">
              <h3
                dangerouslySetInnerHTML={{
                  __html: item[`category`],
                }}></h3>
              <p>{truncate(item[`content_${language}`])}</p>
            </div>
            <div
              className={`news_content_overlay ${
                isOverlayVisible ? "visible" : "leave"
              }`}
              style={{ backgroundImage: `url(${item.image})` }} // Use backgroundImage instead of background
            ></div>
            <button
              onClick={() => {
                navigate(`/project/details/${item.id}`);
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-arrow-right"
                viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
            </button>
          </div>
        ))}
      </section>
      <div className="news_bottom_block"></div>
    </>
  );
};

export default NewsInfo;
