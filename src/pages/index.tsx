import Head from "next/head";
import Link from "next/link";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

import { getPrismicClient } from "../services/prismic";

import styles from "./home.module.scss";
import { Layout } from "../components/Layout";
import { GetStaticProps } from "next";

/*

  component 
    Search
    Paggination

*/

type Post = {
  slug: string;
  title: string;
  thumbnail: {
    alt: string;
    url: string;
  };
  category: string;
  category_color: string;
};

interface PostsProps {
  posts: Post[];
}

export default function Home({ posts }: PostsProps) {
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
          <div className={styles.wrapper}>
            {posts.map((post) => (
              <div className={styles.posts} key={post.slug}>
                <Link href={`/posts/${post.slug}`}>
                  <a>
                    <div
                      className={styles.tag}
                      style={{ borderColor: `${post.category_color}` }}
                    >
                      {post.category}
                    </div>
                    <img src={post.thumbnail.url} alt={post.thumbnail.alt} />
                    <strong>{post.title}</strong>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </main>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    {
      fetch: ["post.title", "post.content", "post.thumbnail", "post.category"],
      fetchLinks: ["categorias.category", "categorias.color"],
      page: 1,
      pageSize: 10,
    }
  );

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      thumbnail: post.data.thumbnail,
      category: post.data.category.data.category[0].text,
      category_color: post.data.category.data.color,
    };
  });

  return {
    props: {
      posts,
    },
  };
};
