import { Manrope } from "next/font/google";
import "./globals.css";
import "@ziqx/react-comps/styles.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "Wusooly POS | 16:9 Hero",
  description: "Wusooly POS display in full-width 16:9 high definition.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <div className="ambient-glow" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}