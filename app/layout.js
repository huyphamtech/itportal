import "./globals.css";
import styles from "./page.module.css";
import { Inter } from "next/font/google";
import Subnav from "@/components/subnav/subnav";
import Navbar from "@/components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IT Ticket Dashboard",
  description: "A IT Ticket Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Subnav />
        <div className={styles.container}>
          <div className={styles.navbar}><Navbar /></div>
          <div className={styles.children}>{children}</div>
        </div>
      </body>
    </html>
  );
}
