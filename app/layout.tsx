import type { Metadata } from "next";
import { Taviraj } from "next/font/google";
import "./globals.css";

const taviraj = Taviraj({
  variable: "--font-taviraj",
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Te invitamos a nuestro matrimonio",
  description: "Nos complace invitarte a nuestra ceremonia",
  openGraph: {
    title: "Te invitamos a nuestro matrimonio",
    description: "Nos complace invitarte a nuestra ceremonia",
    url: "",
    images: [
      {
        url: `./images/thumbnail.png`,
        width: "1032",
        height: "498",
        alt: "Daniel Gaviria y Sebastian Casas",
      },
    ],
    siteName: "Daniel Gaviria y Sebastian Casas",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${taviraj.variable} antialiased`}>{children}</body>
    </html>
  );
}
