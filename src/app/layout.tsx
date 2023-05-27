import "./globals.css";

import { Anuphan } from "next/font/google";

const anuphan = Anuphan({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anuphan",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anuphan.variable}`}>
      <body>{children}</body>
    </html>
  );
}
