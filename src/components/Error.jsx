import styles from "./error.module.css";

export default function Error({ setError }) {
  return (
    <div className={styles.likeErrorContainer}>
      <h4>Error</h4>
      <div>Oops, something went wrong. Please try again later.</div>
      <button onClick={() => setError(false)}>OK</button>
    </div>
  );
}
