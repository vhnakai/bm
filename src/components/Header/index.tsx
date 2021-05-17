import Link from "next/link";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link href="/" passHref>
            <a>
              <img src="/images/website_logo.png" alt="Beyond Money" />
            </a>
          </Link>
        </div>

        <nav>
          <Link href="/about" passHref>
            <a>Sobre</a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
