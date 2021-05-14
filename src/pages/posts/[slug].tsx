import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";
import { Comments } from "../../components/Comments";
import { Layout } from "../../components/Layout";
import { getPrismicClient } from "../../services/prismic";

import styles from "../posts/post.module.scss";

interface Post {
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
}

interface PostProps {
  post: Post;
  previousPost: {
    slug: string;
    title: string;
  };
  nextPost: {
    slug: string;
    title: string;
  };
}

export default function Post({ post, nextPost, previousPost }: PostProps) {
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
            <hr />
            <div className={styles.navPosts}>
              {previousPost ? (
                <Link href={`/post/${previousPost.slug}`}>
                  <a className={styles.previousPost}>
                    <span className={styles.title}>{previousPost.title}</span>
                    <strong>Post anterior</strong>
                  </a>
                </Link>
              ) : (
                <div className={styles.previousPost} />
              )}
              {nextPost && (
                <Link href={`/post/${nextPost.slug}`}>
                  <a className={styles.nextPost}>
                    <span className={styles.title}>{nextPost.title}</span>
                    <strong>Próximo post</strong>
                  </a>
                </Link>
              )}
            </div>
          </article>
          <Comments />
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

  const previousPostResponse = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    {
      fetch: ["post.title"],
      after: `${response.id}`,
      orderings: "[document.first_publication_date desc]",
    }
  );

  const nextPostResponse = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    {
      fetch: ["post.title"],
      after: `${response.id}`,
      orderings: "[document.first_publication_date]",
    }
  );

  const previousPost =
    previousPostResponse.results.length > 0
      ? {
          slug: previousPostResponse.results[0].uid,
          title: previousPostResponse.results[0].data.title,
        }
      : null;

  const nextPost =
    nextPostResponse.results.length > 0
      ? {
          slug: nextPostResponse.results[0].uid,
          title: nextPostResponse.results[0].data.title,
        }
      : null;

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
      previousPost,
      nextPost,
    },
    revalidate: 60 * 30,
  };
};
