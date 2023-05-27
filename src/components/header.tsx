import Link from "next/link";
import Container from "./container";
import Blob from "./blob";

export default function Header() {
  return (
    <h2 className="text-2xl bg-slate-100 bg-gradient-to-l to-white from-slate-100 md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-16 py-8 relative overflow-hidden">
      <Container>
        <Link
          href="/"
          className="hover:underline relative flex items-center justify-center md:inline"
        >
          <span className="relative z-10">AI for Jesus</span>
          <Blob className="absolute -top-24 -left-16 h-[calc(100%+12rem)] w-[calc(100%+8rem)] z-0 blur-xl" />
        </Link>
      </Container>
    </h2>
  );
}
