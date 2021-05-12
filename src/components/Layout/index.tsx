import { Header } from "../Header";
import { Footer } from "../Footer";

import styles from "./styles.module.scss";

export function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
