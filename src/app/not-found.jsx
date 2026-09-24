import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-primary-green text-[280px] font-black">404</h1>
      <h2 className="text-foreground mt-4 text-5xl font-bold">
        Page Not Found
      </h2>
      <p className="text-themeBlack/70 mt-2 text-center text-xl">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved. Return to the homepage or use the navigation menu to find what
        you need.
      </p>
      <Link
        href="/"
        className="bg-primary-green hover:bg-primary-green-dark mt-6 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors lg:text-xl"
      >
        Go Back Home <ChevronRight className="ml-1 inline-block" />
      </Link>
    </div>
  );
}
