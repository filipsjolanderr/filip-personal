import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts, spacing } from "./vars.stylex";
import ThemeControl from "@/components/ThemeControl";
import Footer from "@/components/Footer";
import "./styles/globals.css";
import { ViewTransitions } from "next-view-transitions";
import { Inter, Baskervville } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const baskerville = Baskervville({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-baskerville',
  display: 'swap',
  style: 'italic',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sjolander.dev"),
  title: {
    default: "Filip Sjölander",
    template: "%s | Filip Sjölander",
  },
  description: "Personal website, portfolio, and blog of Filip Sjölander, Software Engineer.",
  keywords: ["Filip Sjölander", "Filip", "Sjölander", "Software Engineer", "Developer", "Gothenburg", "Portfolio", "Blog"],
  creator: "Filip Sjölander",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sjolander.dev",
    siteName: "Filip Sjölander",
    title: "Filip Sjölander",
    description: "Personal website, portfolio, and blog of Filip Sjölander.",
    images: [
      {
        url: "/apple-touch-icon.png",
        width: 180,
        height: 180,
        alt: "Filip Sjölander Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Filip Sjölander",
    description: "Personal website, portfolio, and blog of Filip Sjölander.",
    images: ["/apple-touch-icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html 
        {...stylex.props(styles.html)} 
        lang="en" 
        suppressHydrationWarning
        className={`${inter.variable} ${baskerville.variable}`}
      >
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t==="light"||t==="dark"?t:"system");})();`,
            }}
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicon-96x96.png"
            sizes="96x96"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <meta name="apple-mobile-web-app-title" content="Filip" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <ThemeControl style={styles.body}>
          {children}
          <Footer />
        </ThemeControl>
      </html>
    </ViewTransitions>
  );
}

const styles = stylex.create({
  html: {
    boxSizing: {
      default: "border-box",
      ":where(#\\#), *": "border-box",
    },
    margin: {
      default: 0,
      ":where(#\\#), *": 0,
    },
  },
  body: {
    MozOsxFontSmoothing: "grayscale",
    WebkitFontSmoothing: "antialiased",
    backgroundColor: colors.bg,
    color: colors.fg,
    fontFamily: fonts.sans,
  },
});
