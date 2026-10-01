import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
import Breadcrumb from '@/components/molecules/BreadCrumb';
import SmoothScroll from '@/components/molecules/SmoothScroll';

export const metadata = {
  metadataBase: new URL('https://sswcehumanresources.com'),
  title: {
    default: 'SSWCE Human Resources',
    template: '%s | SSWCE Human Resources',
  },
};

export default function PageLayout({ children }) {
  return (
    <main className="container mx-auto px-4 xl:px-0">
      <Navbar />
      <div className="py-2">
        <Breadcrumb />
      </div>
      <SmoothScroll>{children}</SmoothScroll>
      <Footer />
    </main>
  );
}
