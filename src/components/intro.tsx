import { CMS_NAME, CMS_URL } from "../lib/constants";

export default function Intro() {
  return (
    <section className="md:flex-row md:flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
        Latest Post.
      </h1>
    </section>
  );
}
