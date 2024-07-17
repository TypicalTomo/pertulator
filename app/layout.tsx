import type { Metadata } from 'next';
import Header from './_components/organisms/Header';
import Footer from './_components/organisms/Footer';
import './globals.css';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'PERTulator by Tomoweb.dev',
  description: 'PERTulator is a simple PERT calculator for project management.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pertulator.tomoweb.dev',
    siteName: 'PERTulator',
    title: 'PERTulator by Tomoweb.dev',
    description: 'PERTulator is a simple PERT calculator for project management.',
    images: [
      {
        url: 'https://pertulator.tomoweb.dev/seo.webp',
        width: 1200,
        height: 630,
        alt: 'PERTulator by Tomoweb.dev',
        type: 'image/webp',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#7ac74f" />
        <meta name="msapplication-TileColor" content="#7ac74f" />
        <meta name="theme-color" content="#f3f3f3" />
      </Head>
      <body className="min-h-screen w-full bg-background font-body text-foreground">
        <Header />
        <main className="flex min-h-[calc(100vh_-_152px)] w-full flex-col flex-nowrap items-center justify-center lg:min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
