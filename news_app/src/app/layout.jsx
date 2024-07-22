import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "News App",
  description: "A news app that adopts the use of an API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-white inset-x-0 z-[1] fixed top-0 w-full">
          <Navbar />
        </div>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
