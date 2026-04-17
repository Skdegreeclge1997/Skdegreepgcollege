import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'SK Degree & P.G. College | Vizianagaram',
    template: '%s | SK Degree College'
  },
  description: 'SK Degree & P.G. College (Code: 17950) - Part of MSN Institutions. Providing quality Honours programs in Computer Science, Commerce, and Arts in Vizianagaram.',
  keywords: ['SK Degree College', 'Vizianagaram', 'Degree College AP', 'Honours Courses', 'MSN Institutions', 'Admissions 2024'],
  openGraph: {
    title: 'SK Degree & P.G. College | Vizianagaram',
    description: 'Empowering students through academic excellence. Admissions open for Honours programs.',
    url: 'https://sk-degree-college.vercel.app',
    siteName: 'SK Degree & P.G. College',
    images: [
      {
        url: '/images/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'SK Degree College Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SK Degree & P.G. College',
    description: 'Top-rated degree college in Vizianagaram offering professional honours programs.',
    images: ['/images/logo.jpeg'],
  },
  icons: {
    icon: '/images/logo.jpeg',
    apple: '/images/logo.jpeg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <AuthProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
