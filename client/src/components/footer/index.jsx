import styles from "./styles.module.scss";
import GridFooter from "../gridFooter";
function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <h1>Contact</h1>
      <div className={styles.contactsContainer}>
        <GridFooter />
      </div>
    </footer>
  );
}
export default Footer;
