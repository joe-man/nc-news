import { useEffect, useState } from "react";
import { getArticles, getTopics } from "../../utils/api";
import styles from "./homepage.module.css";
import moment from "moment";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";

export default function Homepage() {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [limitNumber, setLimitNumber] = useState(5);
  const navigate = useNavigate();
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by");
  const orderByQuery = searchParams.get("order_by");
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  function stringify(object) {
    let finalString = "?";
    for (let key in object) {
      finalString += `${key}=${object[key]}&`;
    }
    finalString = finalString.slice(0, -1);
    return finalString;
  }

  function objectify(queryString) {
    if (queryString === "") {
      return {};
    }
    const object = {};
    const queryArray = queryString.replace("?", "").split("&");
    queryArray.forEach((keyValuePair) => {
      const keyValueArray = keyValuePair.split("=");
      object[keyValueArray[0]] = keyValueArray[1];
    });
    return object;
  }

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    getTopics().then((response) => {
      setTopics(response);
    });
    getArticles(limitNumber, pageNumber, topic, sortByQuery, orderByQuery)
      .then((response) => {
        setArticles(response);
        setLoading(false);
      })
      .catch((err) => {
        setNotFound(true);
        setLoading(false);
      });
  }, [pageNumber, limitNumber, topic, searchParams]);

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
    navigate(`/articles/${event.target.value}${location.search}`);
  };

  const handleLimit = (event) => {
    event.preventDefault();
    setLimitNumber(event.target.value);
  };

  const handleQuery = (event, queryIdentifier) => {
    event.preventDefault();
    const queryObject = objectify(location.search);
    queryObject[queryIdentifier] = event.target.value;
    const queryString = stringify(queryObject);
    const query = location.pathname + queryString;
    navigate(query);
  };

  return (
    <div className={styles.container}>
      <h2>Northcoders Articles</h2>

      <div className={styles.header}>
        <div className={styles.dropDownContainer}>
          <h4>Number of articles:</h4>
          <form action="">
            <select defaultValue="5" onChange={handleLimit} className={styles.dropdown}>
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </form>
        </div>
        <div className={styles.dropDownContainer}>
          <h4>Displayings articles:</h4>
          <select defaultValue="" onChange={handleFilter} className={styles.dropdown}>
            <option value="">All</option>
            {topics.map((topic) => (
              <option value={topic.slug} key={topic.slug}>
                {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.dropDownContainer}>
          <h4>Sort by:</h4>
          <select
            defaultValue="created_at"
            onChange={(event) => {
              handleQuery(event, "sort_by");
            }}
            className={styles.dropdown}
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comment count</option>
            <option value="votes">Votes</option>
          </select>
        </div>
        <div className={styles.dropDownContainer}>
          <h4>Order by:</h4>
          <select
            defaultValue="desc"
            onChange={(event) => {
              handleQuery(event, "order_by");
            }}
            className={styles.dropdown}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          {notFound ? (
            <NotFound text="No articles found with this topic" />
          ) : (
            <div className={styles.listContainer}>
              {articles.map((article) => {
                const formattedDate = moment(article.created_by).format("MMMM DD, YYYY");
                return (
                  <Link to={`/articles/article/${article.article_id}`} className={styles.articleContainer} key={article.article_id}>
                    <div className={styles.infoContainer}>
                      <h4>{article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}</h4>
                      <h3>{article.title}</h3>
                      <h4>{article.votes} likes</h4>
                      <h4>{article.comment_count} comments</h4>
                      <h4>{formattedDate}</h4>
                    </div>
                    <div className={styles.imgContainer}>
                      <img src={article.article_img_url} alt={`This is an image for the article title of ${article.title}`} />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      )}

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
