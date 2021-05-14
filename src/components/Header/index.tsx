import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./styles.module.scss";

export function Header() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link href="/" passHref>
          <a className={styles.navbarLogo}>
            <img src="/images/website_logo.png" alt="Beyond Money" />
          </a>
        </Link>
        <div className={styles.bar} onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
        <nav className={click ? styles.active : styles.menu}>
          <div className={styles.item} onClick={closeMobileMenu}>
            <Link href="/about" passHref>
              <a>Sobre</a>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
