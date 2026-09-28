import { fetcher } from "@/packages/admin";

import { FaqSection } from "@/components/organisms/Faq/Faq";
import { AnimatedHeading } from '@/components/atoms/headings'
import Link from "next/link";

export const metadata = {
  title: "FAQs | SSW Training Centre Nepal",
  description:
    "Frequently asked questions about SSW Training Centre Nepal's career counselling, visa guidance, and Japanese language training programs.",
};

export default async function FaqPage() {
  const data = await fetcher("/layouts/faqs");

  return (
    <section className="flex w-full flex-col gap-8 p-4">
      <AnimatedHeading text='FAQs' />
      <div className='text-center'>
        <span className='text-lg text-muted-foreground'>
          Have more question? <Link href='/contact' className='text-black font-semibold'>Contact us</Link>
        </span>
      </div>
      <FaqSection section={data?.layout} />
    </section>
  );
}

