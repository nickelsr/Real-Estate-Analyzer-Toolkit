import Header from "./components/Header/Header";
import "./globals.css";
import { Pontano_Sans, Inter } from "next/font/google";

const pontano_sans = Pontano_Sans({
  subsets: ["latin"],
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
