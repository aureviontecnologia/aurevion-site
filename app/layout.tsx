import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  IBM_Plex_Mono,
  Instrument_Sans,
} from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aureviontecnologia.vercel.app";
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Aurevion | Sites, sistemas e automação sob medida",
  description:
    "A Aurevion cria sites, sistemas e automações sob medida para organizar operações, conectar ferramentas e reduzir trabalho manual.",
  applicationName: "Aurevion",
  keywords: [
    "Aurevion",
    "desenvolvimento de sites",
    "landing pages",
    "sistemas sob medida",
    "automação de processos",
    "integração de sistemas",
  ],
  authors: [{ name: "Aurevion" }],
  creator: "Aurevion",
  publisher: "Aurevion",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Aurevion",
    title: "Aurevion — Tecnologia com direção",
    description:
      "Sites, sistemas e automações sob medida para o jeito que sua empresa realmente trabalha.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Aurevion — Tecnologia com direção",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurevion — Tecnologia com direção",
    description: "Sites, sistemas e automações sob medida.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/aurevion-symbol.png", type: "image/png", sizes: "800x800" },
    ],
    shortcut: "/aurevion-symbol.png",
    apple: "/aurevion-symbol.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07101a",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Aurevion",
  url: siteUrl,
  logo: `${siteUrl}/aurevion-symbol.png`,
  description:
    "Desenvolvimento de sites, sistemas e automações sob medida.",
  areaServed: "Brasil",
  serviceType: [
    "Desenvolvimento de sites",
    "Desenvolvimento de sistemas web",
    "Automação de processos",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-27-92002-6247",
    contactType: "sales",
    availableLanguage: "Portuguese",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {gaId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`,
              }}
            />
          </>
        ) : null}
      </head>
      <body className={`${bricolage.variable} ${instrument.variable} ${plexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
