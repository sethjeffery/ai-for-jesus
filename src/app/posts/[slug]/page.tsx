import { Metadata, ResolvingMetadata } from "next";
import Head from "next/head";
import { draftMode } from "next/headers";
import Container from "../../../components/container";
import Header from "../../../components/header";
import Layout from "../../../components/layout";
import MoreStories from "../../../components/more-stories";
import PostBody from "../../../components/post-body";
import PostHeader from "../../../components/post-header";
import SectionSeparator from "../../../components/section-separator";
import { getAllPostSlugs, getPostAndMorePosts } from "../../../lib/api";

interface PostProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs(false);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params: { slug } }: PostProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { isEnabled: preview } = draftMode();
  const { post, morePosts } = await getPostAndMorePosts(slug, preview);

  return {
    title: `${post.title} | ${(await parent).title}`,
    description: post.excerpt,
    openGraph: {
      images: [post.coverImage.url],
    },
  };
}

export default async function Post({ params: { slug } }: PostProps) {
  const { isEnabled: preview } = draftMode();
  const { post, morePosts } = await getPostAndMorePosts(slug, preview);

  return (
    <Layout preview={preview}>
      <Header />
      <Container>
        <>
          <article>
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
            />
            <PostBody content={post.content} />
          </article>
          <SectionSeparator />
          {morePosts && morePosts.length > 0 && (
            <MoreStories posts={morePosts} />
          )}
        </>
      </Container>
    </Layout>
  );
}
