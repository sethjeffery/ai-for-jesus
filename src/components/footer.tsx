import Container from "./container";
import { EXAMPLE_PATH } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-2/3">
            Inspired by the Spirit, built with Tech.
          </h3>
          <div className="lg:ml-auto">
            <a
              href="https://github.com/sethjeffery/ai-for-jesus"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              View source on GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
