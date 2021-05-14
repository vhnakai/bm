import { useState, useCallback, useEffect } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../services/prismic";

import styles from "./home.module.scss";
import { Layout } from "../components/Layout";

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
  data: Post[];
  nextPage?: string;
}

export default function Home({ data, nextPage }: PostsProps) {
  const [posts, setPosts] = useState<Post[]>(data);
  const [nextP, setNextP] = useState<string>(nextPage);

  function loadPosts() {
    if (nextP) {
      fetch(nextP)
        .then((response) => response.json())
        .then((data) => {
          const newPosts = data.results.map((post) => ({
            slug: post.uid,
            title: RichText.asText(post.data.title),
            thumbnail: post.data.thumbnail,
            category: post.data.category.data.category[0].text,
            category_color: post.data.category.data.color,
          }));

          setNextP(data.next_page);
          setPosts([...posts, ...newPosts]);
        })
        .catch(() => {
          alert("Erro na Aplicação");
        });
    }
  }

  function handleLoadPostClick() {
    loadPosts();
  }

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

            {nextPage && (
              <strong
                className={styles.loadPosts}
                onClick={handleLoadPostClick}
              >
                Carregar mais posts
              </strong>
            )}
          </div>
        </main>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps<PostsProps> = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    {
      fetch: ["post.title", "post.content", "post.thumbnail", "post.category"],
      fetchLinks: ["categorias.category", "categorias.color"],
      page: 1,
      pageSize: 4,
    }
  );

  const nextPage = response.next_page;

  const posts: Post[] = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      thumbnail: post.data.thumbnail,
      category: post.data.category.data.category[0].text,
      category_color: post.data.category.data.color,
    };
  });

  const timeToRevalidate = 60 * 3;

  return {
    props: {
      data: posts,
      nextPage,
    },
    revalidate: timeToRevalidate,
  };
};
