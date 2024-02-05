import { Link } from "react-router-dom";
import styles from "./navlinks.module.css";

export default function NavLink({ link }) {
  return (
    <Link className={styles.link} to={link.path}>
      {link.title}
    </Link>
  );
}
