import { useEffect, useState } from "react";
import { getArticles, getTopics } from "../../utils/api";
import styles from "./homepage.module.css";
import moment from "moment";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [limitNumber, setLimitNumber] = useState(5);
  const navigate = useNavigate();

  const { topic } = useParams();

  useEffect(() => {
    getArticles(limitNumber, pageNumber, topic).then((response) => {
      setArticles(response);
    });
    getTopics().then((response) => {
      setTopics(response);
    });
  }, [pageNumber, limitNumber, topic]);

  const handlePageClick = (event) => {
    event.preventDefault();
    if (pageNumber === 1 && event.target.value === "-1") {
      console.log(pageNumber);
    } else {
      setPageNumber((prev) => prev + +event.target.value);
    }
  };

  const handleFilter = (event) => {
    event.preventDefault();
    navigate(`/articles/${event.target.value}`);
  };

  const handleLimit = (event) => {
    event.preventDefault();
    setLimitNumber(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>Northcoders Articles</h2>

      <div className={styles.header}>
        <div className={styles.dropDownContainer}>
          <h4>Number of articles:</h4>
          <select
            defaultValue="5"
            onChange={handleLimit}
            className={styles.dropdown}
          >
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
        <div className={styles.dropDownContainer}>
          <h4>Displayings articles:</h4>
          <select
            defaultValue=""
            onChange={handleFilter}
            className={styles.dropdown}
          >
            <option value="">All</option>
            {topics.map((topic) => (
              <option value={topic.slug} key={topic.slug}>
                {topic.slug}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.listContainer}>
        {articles.map((article) => {
          const formattedDate = moment(article.created_by).format(
            "MMMM DD, YYYY"
          );
          return (
            <Link
              to={`/article/${article.article_id}`}
              className={styles.articleContainer}
              key={article.article_id}
            >
              <div className={styles.infoContainer}>
                <h4>
                  {article.topic.charAt(0).toUpperCase() +
                    article.topic.slice(1)}
                </h4>
                <h3>{article.title}</h3>
                <h4>Votes: {article.votes}</h4>
                <h4>{formattedDate}</h4>
              </div>
              <div className={styles.imgContainer}>
                <img
                  src={article.article_img_url}
                  alt={`This is an image for the article title of ${article.title}`}
                />
              </div>
            </Link>
          );
        })}
      </div>

      <div className={styles.footerContainer}>
        <button onClick={handlePageClick} value={-1}>
          Previous Page
        </button>
        <div>{pageNumber}</div>
        <button onClick={handlePageClick} value={1}>
          Next Page
        </button>
      </div>
    </div>
  );
}
