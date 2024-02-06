import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleByArticleID } from "../../utils/api";
import styles from "./article.module.css";

export default function Article() {
  const { article_id } = useParams();
  const [currentArticle, setCurrentArticle] = useState({});

  useEffect(() => {
    getArticleByArticleID(article_id).then((response) => {
      setCurrentArticle(response);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img
          src={currentArticle.article_img_url}
          alt={`Image for the article title of ${currentArticle.title}`}
        />
      </div>
      <h3>{currentArticle.title}</h3>
      <div>
        Created by {currentArticle.author} at {currentArticle.created_at}
      </div>
      <div>{currentArticle.topic}</div>
      <div>{currentArticle.body}</div>
      <div>{currentArticle.votes} likes</div>
    </div>
  );
}
