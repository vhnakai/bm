import Head from "next/head";

import styles from "./styles.module.scss";
import { Layout } from "../../components/Layout";

export default function About() {
  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <Layout>
        <div className={styles.jumbotron}>
          <h1>Encontre investimentos em que você acredita!</h1>
        </div>
        <main className={styles.container}>
          <div className={styles.content}>
            <p>
              <strong>Nossa missão</strong> é trazer informações para as pessoas
              sobre investimentos, visando algo mais do que apenas a
              rentabilidade. Queremos mostrar que{" "}
              <strong>
                investir não significa apenas “ganhar dinheiro” mas também
                contribuir com a sociedade{" "}
              </strong>
              , apoiando uma área, causa ou segmento que você acredita.
            </p>
            <p>
              Geralmente, quando se fala em investimentos em renda variável a
              primeira coisa que vem em mente da maioria das pessoas, é bolsa de
              valores. Todavia, nós mostraremos que existem opções além de ações
              e fundos imobiliários, e que você pode contruibuir com o
              empreendedorismo do pais investindo em pequenas e médias empresas,
              além de startups.
            </p>
            <p>
              Também iremos falar sobre ações, mas de outro modo. Ao invés de
              apenas analizarmos os números e como o papel tem performado,
              queremos mostrar como você pode investir em segmentos espefícos e
              que que te agradem, como industria de games, produtos veganos, pet
              e muitos outros.
            </p>
          </div>
        </main>
      </Layout>
    </>
  );
}
