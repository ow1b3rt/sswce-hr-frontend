import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
import Breadcrumb from '@/components/molecules/BreadCrumb';
export default function PageLayout({ children }) {
  return (
    <main className="container mx-auto px-4 xl:px-0">
      <Navbar />
      <div className="py-2">
        <Breadcrumb />
      </div>
      {children}
      <Footer />
    </main>
  );
}
