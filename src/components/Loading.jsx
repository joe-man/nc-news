import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div>Loading...</div>
      <img src="./loading.gif" alt="loading gif" />
    </div>
  );
}
