import './globals.css';
import { Outfit } from 'next/font/google';
const outfit = Outfit({
  subsets: ['latin'],
});

//TODOS: UPDATE the metadata for SSWHR

export const metadata = {
  title: {
    default: 'SSWCE Human Resources',
    template: '%s | SSWCE Human Resources',
  },
  description:
    'SSW Training Centre Nepal helps you build a career in Japan through expert career counselling, visa guidance, Japanese language preparation, and SSW training.',
  metadataBase: new URL('https://sswtrainingcentre.com.np'),
  openGraph: {
    siteName: 'SSW Training Centre Nepal',
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.className}>
      <body>{children}</body>
    </html>
  );
}
