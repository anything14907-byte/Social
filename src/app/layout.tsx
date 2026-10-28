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
import StoryViewerModal from '@/components/feed/StoryViewerModal';
import RazorpayCheckoutModal from '@/components/monetization/RazorpayCheckoutModal';
import BoostPostModal from '@/components/monetization/BoostPostModal';
import VerificationRequestModal from '@/components/monetization/VerificationRequestModal';
import AuthModal from '@/components/auth/AuthModal';
import ProfileSetupWizard from '@/components/auth/ProfileSetupWizard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BharatGram - India\'s Visual Social Network & Creator Storefront',
  description: 'Share photos, reels, and stories with millions of creators across India. Buy & sell handlooms, art, and local services with instant UPI checkout.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-[#FAFAFA] dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors`}>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <FeedProvider>
                <div className="flex min-h-screen">
                  {/* Left Desktop Sidebar Navigation */}
                  <Sidebar />

                  {/* Top & Bottom Mobile Navigation Bars */}
                  <MobileNavbar />

                  {/* Main Scrollable Viewport */}
                  <main className="flex-1 md:ml-20 xl:ml-64 pt-14 md:pt-0 pb-16 md:pb-0 min-h-screen flex justify-center">
                    {children}
                  </main>
                </div>

                {/* Global Modals */}
                <CreatePostModal />
                <StoryViewerModal />
                <RazorpayCheckoutModal />
                <BoostPostModal />
                <VerificationRequestModal />
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
