import type { Metadata } from 'next';
import Header from './_components/organisms/Header';
import Footer from './_components/organisms/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'PERTulator by Tomoweb.dev',
  description: 'PERTulator is a simple PERT calculator for project management.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full bg-background font-body text-foreground">
        <Header />
        <main className="flex min-h-[calc(100vh_-_152px)] lg:min-h-screen w-full flex-col flex-nowrap items-center justify-center">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
