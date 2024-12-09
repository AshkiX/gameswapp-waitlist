import type { Metadata } from "next";
import { Inter_Tight, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter_Tight({ subsets: ["latin"] });
const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: "GameSwapp - Board Game Exchange Community",
  description: "GameSwapp is an upcoming platform that connects board game enthusiasts to swap their unused games with other players.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} ${outfit.variable} min-h-full`}>
        {children}
      </body>
    </html>
  );
}
