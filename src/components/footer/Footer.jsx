import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <p className={styles.logo}>Joe Man</p>
      <p className={styles.text}>Original Design</p>
    </div>
  );
};

export default Footer;
