import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import { profile } from "@/content/cv";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: profile.name,
  description:
    "Web developer and deep-learning researcher working on cardiovascular disease detection from paper-based ECG signals.",
  openGraph: {
    title: profile.name,
    description:
      "Web developer and deep-learning researcher working on cardiovascular disease detection from paper-based ECG signals.",
    type: "profile",
  },
};

/**
 * Stamps the saved theme on <html> before first paint, so a viewer who chose
 * dark never sees a flash of the light palette.
 */
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('somrat-portfolio-theme');
    if (t === 'dark' || t === 'light') document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
