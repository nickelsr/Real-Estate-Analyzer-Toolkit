import Header from "./components/Header/Header";
import { Inter } from "next/font/google";
import "@styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
