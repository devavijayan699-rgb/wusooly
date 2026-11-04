import { Manrope } from "next/font/google";
import "./globals.css";
import "@ziqx/react-comps/styles.css";
import SmoothScroll from "./components/SmoothScroll";
import TransitionProvider from "./components/TransitionProvider";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "Wusooly POS | Point of Sale & Business Management",
  description: "Wusooly POS display in full-width 16:9 high definition.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <head>
        {/* Inline script to append .js class instantly before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Manrope:wght@300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="ambient-glow" aria-hidden="true" />
        <SmoothScroll>
          <TransitionProvider>
            {children}
          </TransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
