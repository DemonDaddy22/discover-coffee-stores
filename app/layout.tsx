import CoffeeStoresContextProvider from '@/context/CoffeeStoresContext';
import './globals.css';
import { IBM_Plex_Sans } from 'next/font/google';

const ibmPlexSans = IBM_Plex_Sans({ weight: ['100', '300', '500', '700'], subsets: ['latin'] });

export const metadata = {
  title: 'Coffee Connoisseur',
  description: 'Discover your local coffee shops!',
};

// TODO - check if this works for animating pages https://stackoverflow.com/a/68541731/9892038
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={ibmPlexSans.className}>
        <CoffeeStoresContextProvider>{children}</CoffeeStoresContextProvider>
      </body>
    </html>
  );
}
