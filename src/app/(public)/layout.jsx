import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
export default function PageLayout({ children }) {
  return (
    <main className="container mx-auto">
      <Navbar />
      <div>{children}</div>
      <Footer />
    </main>
  );
}
