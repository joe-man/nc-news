import Header from "../Header";
import Links from "./links/Links";
import styles from "./navbar.module.css";

export default function Navbar() {
  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Login",
      path: "/login",
    },
    {
      title: "Create User",
      path: "/create_user",
    },
  ];

  return (
    <div className={styles.container}>
      <Header />
      <nav>
        <Links />
      </nav>
    </div>
  );
}
