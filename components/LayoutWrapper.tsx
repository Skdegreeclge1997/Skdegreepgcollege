"use client";

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Only hide header/footer for dashboard pages, NOT the login pages
  const isDashboardPath = (pathname.startsWith('/admin') && pathname !== '/admin/login') || pathname === '/dashboard';
  const isAdminPath = isDashboardPath;

  return (
    <>
      {!isAdminPath && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminPath && pathname !== '/' && <Footer />}
      <PWAInstallPrompt />
    </>
  );
}
