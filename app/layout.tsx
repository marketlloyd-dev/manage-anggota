import './globals.css';
import { ReactNode } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';

export const metadata = { title: 'Himmah NW Komisariat', description: 'Manajemen Organisasi' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>
        <AnimatedBackground />
        <main className="relative z-10 min-h-screen">{children}</main>
      </body>
    </html>
  );
}