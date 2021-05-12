import Link from "next/link";
import styles from "./styles.module.scss";

export function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <Link href="/" passHref>
          <a>
            <img
              src="/images/logo_simples.png"
              alt="Beyond Money"
              width={100}
            />
          </a>
        </Link>

        <div className={styles.contacts}>
          <h3>Contato</h3>
          <p>email@email.com</p>
        </div>
      </div>
      <div className={styles.devs}>
        Feito por Wellignton Carlos Massola & Vitor Hugo Nakai
      </div>
    </footer>
  );
}
