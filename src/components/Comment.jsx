import { useContext, useEffect, useState } from "react";
import styles from "./comment.module.css";
import { deleteComment, getCommentsByArticleID, postCommentByArticleID } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import moment from "moment";
import Error from "./Error";

export default function Comments({ article_id }) {
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);
  const [disabled, setDisabled] = useState(true);
  const [commentBoxText, setCommentBoxText] = useState("");
  const [loading, setLoading] = useState(false);
  const [postCommentError, setPostCommentError] = useState(false);
  const [disableDelete, setDisableDelete] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getCommentsByArticleID(article_id).then((response) => {
      setComments(response);
    });
  }, []);

  const handleText = (event) => {
    setCommentBoxText(event.target.value);
    if (event.target.value.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    postCommentByArticleID(article_id, {
      username: user.username,
      body: commentBoxText,
    })
      .then((response) => {
        setLoading(false);
        setCommentBoxText("");
        setDisabled(true);
        setComments((prevComments) => {
          const updatedComments = [...prevComments];
          updatedComments.unshift(response);
          return updatedComments;
        });
      })
      .catch((err) => {
        setLoading(false);
        setDisabled(true);
        setPostCommentError(true);
      });
  };

  const handleDeleteComment = (event, comment) => {
    setDisableDelete(true);

    deleteComment(comment.comment_id)
      .then(() => {
        setDisableDelete(false);
        setComments((prevComment) => {
          const updatedComments = [...prevComment];
          const index = updatedComments.indexOf(comment);
          updatedComments.splice(index, 1);
          return updatedComments;
        });
      })
      .catch((err) => {
        setDisableDelete(false);
        setError(true);
      });
  };

  return (
    <div className={styles.container}>
      {error && <Error setError={setError} className={styles.error} />}
      <h4>{comments.length} comments</h4>
      <div className={styles.addCommentContainer}>
        <div className={styles.imgContainer}>
          <img src={user.avatar_url} alt={`Avatar image for username ${user.username}`} />
        </div>

        {loading ? (
          <img className="loading" src="/loading.gif" alt="loading gif" />
        ) : (
          <form className={styles.inputContainer}>
            <textarea type="text" placeholder="Add a comment..." onChange={handleText} value={commentBoxText} />
            <button onClick={handleSubmit} disabled={disabled}>
              submit
            </button>
          </form>
        )}
        {postCommentError && <Error setError={setPostCommentError} />}
      </div>
      {comments.map((comment) => {
        const formattedDate = moment(comment.created_by).format("MMMM DD, YYYY");
        return (
          <div className={styles.singleCommentContainer} key={comment.comment_id}>
            <div className={styles.imgContainer}>
              <img src={comment.avatar_url} alt={`Avatar for username ${comment.author}`} />
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
            {comment.author === user.username && (
              <div className={styles.deleteContainer}>
                <button disabled={disableDelete} onClick={() => handleDeleteComment(event, comment)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
