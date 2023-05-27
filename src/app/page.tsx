import { Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import JesusLaptop from "../assets/jesus-laptop.png";
import Blob from "../components/blob";
import Container from "../components/container";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import MoreStories from "../components/more-stories";
import { getAllPostsForHome } from "../lib/api";

export const metadata: Metadata = {
  title: "AI for Jesus",
  description:
    "Thoughtful and careful instructions on how to employ AI within the church, for the good of the Kingdom.",
};

function Hero() {
  return (
    <section className="relative bg-sky-100 bg-gradient-to-l to-white from-sky-100 lg:min-h-[443px] lg:flex justify-center items-center overflow-hidden">
      <Blob className="absolute left-0 top-0 w-full lg:w-1/2 h-full blur-3xl" />
      <div className="container mx-auto px-5 relative z-10 text-center lg:text-left">
        <h1 className="pt-6 lg:pt-0 text-6xl lg:text-8xl leading-none font-semibold">
          AI for{" "}
          <span className="text-slate-800 [text-shadow:_-2px_-2px_0_rgb(255_255_255),_2px_2px_0_rgb(255_200_0)] lg:[text-shadow:_-2px_-5px_0_rgb(255_255_255),_2px_5px_0_rgb(255_200_0)]">
            Jesus
          </span>
        </h1>
        <p className="text-xl lg:text-2xl lg:max-w-[700px] mt-6">
          Thoughtful and careful instructions on how to employ AI within the
          church, for the good of the Kingdom.
        </p>
      </div>
      <div className="lg:absolute right-0 bottom-0 z-0">
        <Image
          alt="Banner Image"
          src={JesusLaptop}
          width="548"
          decoding="async"
          data-nimg="1"
          className="mx-auto text-transparent w-[50vw] md:w-[33vw] max-w-[443px] ml-auto mr-0"
        />
      </div>
    </section>
  );
}

export default async function Index() {
  const { isEnabled: preview } = draftMode();
  const allPosts = (await getAllPostsForHome(preview)) ?? [];
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Layout preview={preview}>
        <Hero />
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}
