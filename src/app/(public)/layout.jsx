import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
import Breadcrumb from '@/components/molecules/BreadCrumb';
export default function PageLayout({ children }) {
  return (
    <main className="container mx-auto">
      <Navbar />
      <Breadcrumb />
      {children}
      <Footer />
    </main>
  );
}
