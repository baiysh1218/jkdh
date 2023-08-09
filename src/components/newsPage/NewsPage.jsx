import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pageContext } from "../../contexts/PageContext/PageContext";
import Loader from "../loader/Loader";
import "../newsInfo/style/NewsInfo.css";
import "./News.css";

const NewsPage = () => {
  const { postsAll, language, getPosts, posts } = useContext(pageContext);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [postSliced, setPostsSliced] = useState([]);
  const [random, setRandom] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  }, []);

  const handleFilteredPost = () => {
    setPostsSliced(
      posts?.filter(
        item =>
          item.category === "Новости" ||
          item.category === "News" ||
          item.category === "Жанылыктар"
      )
    );
  };

  useEffect(() => {
    handleFilteredPost();
  }, [posts]);

  const handleMouseEnter = () => {
    setIsOverlayVisible(true);
  };

  const handleMouseLeave = () => {
    setIsOverlayVisible(false);
  };

  console.log(postSliced);

  return (
    <>
      {postSliced.length > 0 ? (
        <>
          <section
            className="news_wrapper news_page_wrapper"
            style={{ backgroundImage: `url(${random?.image})` }}>
            <div className="news_info_card_wrapper">
              {postSliced.map(item => (
                <div
                  className="news_content_table"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  key={item.id} // Don't forget to provide a unique key for each mapped element
                >
                  <div className="news_content_item news_card">
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: item[`category`],
                      }}></h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item[`content_${language}`],
                      }}></p>
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
            </div>
          </section>
          <div className="news_bottom"></div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default NewsPage;
