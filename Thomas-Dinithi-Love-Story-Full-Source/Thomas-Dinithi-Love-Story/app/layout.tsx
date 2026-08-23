import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thomas-dinithi-love-story.itmmd2026.chatgpt.site"),
  title: "Thomas & Dinithi — Our Love Story",
  description: "A little universe of memories, made with love by Dinithi for Thomas.",
  openGraph: {
    title: "Thomas & Dinithi — Our Love Story",
    description: "A little universe of memories, made with love by Dinithi for Thomas.",
    type: "website",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "Thomas and Dinithi — Our Love Story" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas & Dinithi — Our Love Story",
    description: "A little universe of memories, made with love by Dinithi for Thomas.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
