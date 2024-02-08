import { Link } from "react-router-dom";
import styles from "./navlinks.module.css";

export default function NavLink({ link, setOpen }) {
  return (
    <Link onClick={() => setOpen((prev) => !prev)} className={styles.link} to={link.path}>
      {link.title}
    </Link>
  );
}
