import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UMak Confessions",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen min-w-screen h-screen flex flex-col items-center`}
      >
        <div className="w-full h-full max-w-screen-2xl flex flex-col">
          <Navbar />
          <div className="h-full max-h-[600px]">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
