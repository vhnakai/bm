import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { Layout } from "../../components/Layout";
import { getPrismicClient } from "../../services/prismic";

import styles from "../posts/post.module.scss";

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Layout>
        <main className={styles.container}>
          <article className={styles.post}>
            <h1>{post.title}</h1>
            <div
              className={styles.postContent}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </main>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID("post", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30,
  };
};
