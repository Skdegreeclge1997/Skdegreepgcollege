import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SK Degree & P.G. College | Best College in Vizianagaram",
    template: "%s | SK Degree & P.G. College"
  },
  description: "Official website of SK Degree & P.G. College (17950). Part of MSN Institutions. Excellence in Science, Commerce, and Arts Honours programs in Vizianagaram.",
  keywords: ["SK Degree College", "SK PG College", "Vizianagaram", "MSN Institutions", "Best Degree College", "B.Sc Honours", "B.Com Honours", "NCC Army Navy"],
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
