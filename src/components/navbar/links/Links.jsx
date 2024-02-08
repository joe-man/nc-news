import NavLink from "./navlink/NavLink";
import styles from "./links.module.css";
import { useEffect, useState } from "react";

export default function Links() {
  const [open, setOpen] = useState(false);

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
      <div className={styles.linkContainer}>
        {links.map((link) => (
          <NavLink link={link} key={link.title} />
        ))}
      </div>
      <div className={styles.hamburgerContainer}>
        <button onClick={() => setOpen((prev) => !prev)} className={styles.menuButton}>
          <img src="./hamburger.png" alt="hamburger menu button" />
        </button>
        {open && (
          <div>
            <div className={styles.menuContainer}>
              <div className={styles.menuList}>
                <button onClick={() => setOpen((prev) => !prev)} className={styles.menuButton + " " + styles.closeButton}>
                  <img src="./close.png" alt="close button" />
                </button>
                {links.map((link) => (
                  <NavLink setOpen={setOpen} link={link} key={link.title} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
