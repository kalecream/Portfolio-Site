import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Faraji Sparks - Portfolio",
  description: "A Jamaican Web Engineer specializing in front-end development and design. With a passion for crafting visually stunning and user-friendly websites, I bring creativity and technical expertise to every project. Explore my portfolio to see how I blend aesthetics with functionality to create exceptional digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
