import { Link } from "react-router-dom";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div>
      <Link className={styles.link} to="/">
        <h1>NC News</h1>
      </Link>
    </div>
  );
}
