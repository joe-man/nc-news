import styles from "./about.module.css";

export default function About() {
  return (
    <div className={styles.container}>
      <h2>About this Project</h2>
      <div className={styles.bodyContainer}>
        <p>
          Welcome to NC News, a social news aggregation, web content rating and discussion website. Northcoders News has articles which are divided into topics, and each article has user-curated
          ratings from upvotes and downvotes using the API. Users can also add comments about an article.
        </p>
        <img src="./newspaper.jpg" alt="black and white newspapers stacked on top of each other" />
      </div>
    </div>
  );
}
