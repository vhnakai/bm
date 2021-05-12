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
    author: string;
    profileImage: {
      dimensions: {
        width: number;
        height: number;
      };
      alt: string;
      url: string;
    };
    description: string;
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
            <div className={styles.author}>
              <img src={post.profileImage.url} alt={post.profileImage.alt} />
              <strong>{post.author}</strong>
              <q>{post.description}</q>
            </div>
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

  const response = await prismic.getByUID("post", String(slug), {
    fetchLinks: ["autor.name", "autor.profile_image", "autor.descricao"],
  });

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    author: RichText.asText(response.data.author.data.name),
    profileImage: response.data.author.data.profile_image,
    description: RichText.asText(response.data.author.data.descricao),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30,
  };
};
