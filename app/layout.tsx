import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Background } from "@/components/shared/background";
import { CursorGlow } from "@/components/shared/cursor-glow";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { BackToTop } from "@/components/shared/back-to-top";
import { CommandPalette } from "@/components/shared/command-palette";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { siteConfig, socialLinks } from "@/constants/site";
import "@/styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.shortName} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.shortName} | ${siteConfig.title}`,
    description: siteConfig.description,
    siteName: siteConfig.shortName,
    // 1200x630 is the aspect every major platform crops to; a square image
    // gets letterboxed or centre-cropped by LinkedIn and Twitter.
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.shortName} | ${siteConfig.title}`,
    description: siteConfig.description,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  email: siteConfig.email,
  jobTitle: siteConfig.title,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Batangas City",
    addressCountry: "PH",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: siteConfig.university,
  },
  // Derived from the shared config rather than hardcoded: this list had
  // already drifted out of sync with socialLinks once.
  sameAs: socialLinks.map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[300] -translate-y-24 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LoadingScreen />
          <ScrollProgress />
          <Background />
          <CursorGlow />
          <CommandPalette />
          <Navbar />
          <div id="main-content" className="pt-28 sm:pt-32">
            {children}
          </div>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
