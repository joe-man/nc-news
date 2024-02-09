import styles from "./links.module.css";
import { useEffect, useState } from "react";
import hamburger from "../../../images/hamburger.png";
import close from "../../../images/close.png";
import { Link } from "react-router-dom";

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
      title: "Users",
      path: "/change_user",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.linkContainer}>
        {links.map((link) => (
          <Link className={styles.link} to={link.path} key={link.title}>
            {link.title}
          </Link>
        ))}
      </div>
      <div className={styles.hamburgerContainer}>
        <button onClick={() => setOpen((prev) => !prev)} className={styles.menuButton}>
          <img src={hamburger} alt="hamburger menu button" />
        </button>
        {open && (
          <div>
            <div className={styles.menuContainer}>
              <div className={styles.menuList}>
                <button onClick={() => setOpen((prev) => !prev)} className={styles.menuButton + " " + styles.closeButton}>
                  <img src={close} alt="close button" />
                </button>
                {links.map((link) => (
                  <Link onClick={() => setOpen((prev) => !prev)} key={link.title} className={styles.link} to={link.path}>
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
