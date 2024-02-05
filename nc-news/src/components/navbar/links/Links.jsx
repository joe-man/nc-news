import NavLink from "./navlink/NavLink";
import styles from "./links.module.css";

export default function Links() {
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
      {links.map((link) => (
        <NavLink link={link} key={link.title} />
      ))}
    </div>
  );
}
