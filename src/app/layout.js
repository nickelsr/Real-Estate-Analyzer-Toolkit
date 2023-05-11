import "./globals.css";
import { Pontano_Sans } from "next/font/google";

const montserrat = Pontano_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
