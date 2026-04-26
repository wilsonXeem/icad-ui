import { IBM_Plex_Sans, Space_Grotesk } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

const headingFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const bodyFont = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: {
    default: 'ICAD | Innovation Centre for Computer-Aided Discovery',
    template: '%s | ICAD',
  },
  description:
    'Premium scientific frontend for AI-driven drug discovery, computational chemistry, research services, and academy access.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} bg-ink text-mist`}>
        <AuthProvider>
          <div className="relative min-h-screen overflow-x-clip">
            <Navbar />
            <main className="relative z-10 pt-20">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
