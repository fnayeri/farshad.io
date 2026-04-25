import type { Metadata } from "next";
import "./globals.css";
import about from "@/content/about.json";
import SiteNav from "@/components/SiteNav";
import AboutModal from "@/components/AboutModal";

export const metadata: Metadata = {
  title: "Farshad Nayeri – farshad.io – Technologist",
  description:
    "Proven product leader with deep experience in technology and product innovation.",
  icons: {
    icon: "/assets/about/fn.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteNav about={about} />
        <main id="main" role="main" className="container">
          {children}
        </main>
        <AboutModal about={about} />
        <footer className="site-footer">
          <div className="container">
            <p>
              @{new Date().getFullYear()} Farshad Nayeri. All Rights Reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
