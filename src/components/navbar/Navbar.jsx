import { useContext } from "react";
import Header from "../Header";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import { UserContext } from "../../contexts/UserContext";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <Header />
      <nav className={styles.navContainer}>
        <Links />
        <div className={styles.imgContainer}>
          <img src={user.avatar_url} alt={`Avatar for active user: ${user.username}`} />
        </div>
      </nav>
    </div>
  );
}
