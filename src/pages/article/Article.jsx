import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleByArticleID, patchVotesByArticleID } from "../../utils/api";
import styles from "./article.module.css";
import Comments from "../../components/Comment";
import moment from "moment";
import Error from "../../components/Error";

export default function Article() {
  const { article_id } = useParams();
  const [currentArticle, setCurrentArticle] = useState({});
  const [likeError, setLikeError] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);

  const formattedDate = moment(currentArticle.created_by).format(
    "MMMM DD, YYYY"
  );

  useEffect(() => {
    getArticleByArticleID(article_id).then((response) => {
      setCurrentArticle(response);
    });
  }, []);

  const handleLike = (value) => {
    setCurrentArticle((prevArticle) => {
      const updatedArticle = { ...prevArticle };
      updatedArticle.votes += value;
      return updatedArticle;
    });
    setDisableButtons(true);
    patchVotesByArticleID(article_id, value).catch(() => {
      setCurrentArticle((prevArticle) => {
        const updatedArticle = { ...prevArticle };
        updatedArticle.votes -= value;
        return updatedArticle;
      });
      setLikeError(true);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.articleContainer}>
        <div className={styles.imgContainer}>
          <img
            src={currentArticle.article_img_url}
            alt={`Image for the article title of ${currentArticle.title}`}
          />
        </div>
        <h3>{currentArticle.title}</h3>
        <div>
          Created by {currentArticle.author} at {formattedDate}
        </div>
        <div>{currentArticle.topic}</div>
        <div>{currentArticle.body}</div>
        <div className={styles.likesContainer}>
          <button disabled={disableButtons} onClick={() => handleLike(1)}>
            <img src="/thumbsup.png" alt="thumbs up icon" />
          </button>
          <div>{currentArticle.votes} likes</div>
          <button disabled={disableButtons} onClick={() => handleLike(-1)}>
            <img src="/thumbsdown.png" alt="thumbs down icon" />
          </button>
        </div>
        {likeError && <Error setError={setLikeError} />}
      </div>
      <Comments article_id={article_id} />
    </div>
  );
}
