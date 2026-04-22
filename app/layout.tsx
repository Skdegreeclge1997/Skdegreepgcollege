import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://skdegreecollege.com'),
  title: {
    default: 'S.K. Degree & P.G. College | Vizianagaram',
    template: '%s | S.K. Degree College'
  },
  description: 'S.K. Degree & P.G. College (Code: 17950) - Part of Arunodaya Educational Society. Providing quality Honours programs in Computer Science, Commerce, and Arts in Vizianagaram.',
  keywords: ['S.K. Degree College', 'Vizianagaram', 'Degree College AP', 'Honours Courses', 'Arunodaya Educational Society', 'Admissions 2026'],
  openGraph: {
    title: 'S.K. Degree & P.G. College | Vizianagaram',
    description: 'Empowering students through academic excellence. Admissions open for Honours programs.',
    url: 'https://skdegreecollege.com',
    siteName: 'S.K. Degree & P.G. College',
    images: [
      {
        url: '/images/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'S.K. Degree College Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S.K. Degree & P.G. College',
    description: 'Top-rated degree college in Vizianagaram offering professional honours programs.',
    images: ['/images/logo.jpeg'],
  },
  icons: {
    icon: '/images/logo.jpeg',
    apple: '/images/logo.jpeg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import LayoutWrapper from "@/components/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://prj_m9THnh0P5niRdKGjlVOtez5fYuqD.supabase.co" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollegeOrUniversity",
              "name": "S.K. Degree & P.G. College",
              "alternateName": "S.K. Degree College",
              "url": "https://skdegreecollege.com",
              "logo": "https://skdegreecollege.com/images/logo.jpeg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ayyannapeta Junction",
                "addressLocality": "Vizianagaram",
                "addressRegion": "Andhra Pradesh",
                "postalCode": "535003",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9441253163",
                "contactType": "admissions",
                "areaServed": "IN",
                "availableLanguage": ["English", "Telugu"]
              },
              "sameAs": [
                "https://www.facebook.com/skdegreecollege",
                "https://www.instagram.com/skdegreecollege"
              ]
            })
          }}
        />
        <AuthProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
