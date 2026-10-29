import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import { AuthProvider } from '@/context/AuthContext';
import { FeedProvider } from '@/context/FeedContext';
import Sidebar from '@/components/layout/Sidebar';
import MobileNavbar from '@/components/layout/MobileNavbar';
import CreatePostModal from '@/components/create/CreatePostModal';
import OrderInquiryModal from '@/components/feed/OrderInquiryModal';
import AuthModal from '@/components/auth/AuthModal';
import ProfileSetupWizard from '@/components/auth/ProfileSetupWizard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VyaparVibe - Empowering Local Indian Creators, Artisans & Small Businesses',
  description: 'Showcase skills, crafts, and handmade products with direct local sales, customer inquiries, and short video showcases across India.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-light-bg dark:bg-dark-bg text-neutral-900 dark:text-neutral-100 transition-colors`}>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <FeedProvider>
                <div className="flex min-h-screen">
                  {/* Left Desktop Sidebar Navigation */}
                  <Sidebar />

                  {/* Top & Bottom Mobile Navigation Bars */}
                  <MobileNavbar />

                  {/* Main Content Area */}
                  <main className="flex-1 md:ml-20 xl:ml-64 pt-14 md:pt-0 pb-16 md:pb-0 min-h-screen flex justify-center">
                    {children}
                  </main>
                </div>

                {/* Modals & Drawers */}
                <CreatePostModal />
                <OrderInquiryModal />
                <AuthModal />
                <ProfileSetupWizard />
              </FeedProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
