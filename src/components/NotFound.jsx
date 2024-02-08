import styles from "./notfound.module.css";

export default function NotFound({ text }) {
  if (!text) text = "The requested URL was not found on this server. That's all we know.";

  return (
    <div className={styles.container}>
      <h3>404. That's an error.</h3>
      <p>{text}</p>
    </div>
  );
}
