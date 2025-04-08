import "./globals.css";
import Subnav from "@/components/subnav/subnav";
import Navbar from "@/components/navbar/navbar";

export const metadata = {
  title: "IT Admin Center",
  description: "IT Admin Center",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Subnav />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
