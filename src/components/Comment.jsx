import { useContext, useEffect, useState } from "react";
import styles from "./comment.module.css";
import { getCommentsByArticleID } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import moment from "moment";

export default function Comments({ article_id }) {
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getCommentsByArticleID(article_id).then((response) => {
      setComments(response);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h4>{comments.length} comments</h4>
      <div className={styles.addCommentContainer}>
        <div className={styles.imgContainer}>
          <img
            src={user.avatar_url}
            alt={`Avatar image for username ${user.username}`}
          />
        </div>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="Add a comment..." />
        </div>
      </div>
      {comments.map((comment) => {
        const formattedDate = moment(comment.created_by).format(
          "MMMM DD, YYYY"
        );
        return (
          <div
            className={styles.singleCommentContainer}
            key={comment.comment_id}
          >
            <div className={styles.imgContainer}>
              <img
                src={comment.avatar_url}
                alt={`Avatar for username ${comment.author}`}
              />
            </div>
            <div className={styles.textContainer}>
              <div className={styles.commentHeader}>
                <div className={styles.authorText}>@{comment.author}</div>
                <div className={styles.date}>{formattedDate}</div>
              </div>
              <div>{comment.body}</div>
              <div className={styles.likesContainer}>
                <button>
                  <img src="/thumbsup.png" alt="thumbs up icon" />
                </button>
                <div>{comment.votes} likes</div>
                <button>
                  <img src="/thumbsdown.png" alt="thumbs down icon" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
