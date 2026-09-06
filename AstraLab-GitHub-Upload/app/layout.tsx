import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AstraLab | Science Olympiad Astronomy Trainer',
  description: 'DSO identification, galaxy image galleries, source-backed galaxy questions, and Astronomy calculations.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
