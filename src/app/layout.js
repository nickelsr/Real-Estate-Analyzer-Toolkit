import Header from "./components/Header/Header";
import "./globals.css";
import { Pontano_Sans } from "next/font/google";

const pontano_sans = Pontano_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={pontano_sans.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
