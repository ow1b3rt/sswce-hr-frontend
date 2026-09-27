import DetailPage from '@/components/templates/DetailPage';

// Placeholder data — replace with API call keyed by slug when backend is ready.
const SERVICES_DATA = {
  'work-visa-assistance': {
    title: 'Work Visa Assistance',
    content: [
      {
        type: 'paragraph',
        text: 'Navigating the complexities of international work visas can be daunting. SSW CE HR provides comprehensive end-to-end support, from initial assessment to final approval.',
      },
      {
        type: 'heading',
        text: 'What We Offer',
      },
      {
        type: 'list',
        items: [
          'Eligibility assessment for your target country',
          'Document preparation and verification',
          'Application submission and tracking',
          'Interview coaching and preparation',
          'Post-approval settlement support',
        ],
      },
      {
        type: 'heading',
        text: 'Why Choose Us',
      },
      {
        type: 'paragraph',
        text: 'Our team has a proven track record of successfully processing thousands of visa applications across Europe, the Middle East, and beyond. We stay up to date with the latest immigration laws to give you the best chance of approval.',
      },
    ],
  },
  'job-placement': {
    title: 'Job Placement',
    content: [
      {
        type: 'paragraph',
        text: 'Our expert recruiters have deep networks across multiple industries, connecting skilled professionals with top employers who value international talent.',
      },
      {
        type: 'heading',
        text: 'Industries We Cover',
      },
      {
        type: 'list',
        items: [
          'Healthcare & Nursing',
          'Engineering & Construction',
          'Information Technology',
          'Finance & Accounting',
          'Hospitality & Tourism',
        ],
      },
      {
        type: 'heading',
        text: 'Our Placement Process',
      },
      {
        type: 'ordered-list',
        items: [
          'Initial consultation and career assessment',
          'CV review and optimisation',
          'Matching with suitable employers',
          'Interview preparation and coaching',
          'Offer negotiation and onboarding support',
        ],
      },
    ],
  },
  'career-counseling': {
    title: 'Career Counseling',
    content: [
      {
        type: 'paragraph',
        text: 'Our experienced career advisors understand the intricacies of the international job market and provide tailored guidance to help you reach your professional goals.',
      },
      {
        type: 'heading',
        text: 'Counseling Services',
      },
      {
        type: 'list',
        items: [
          'One-on-one career planning sessions',
          'Skills gap analysis',
          'Industry-specific market insights',
          'International qualification recognition guidance',
          'Salary benchmarking and negotiation strategies',
        ],
      },
      {
        type: 'heading',
        text: 'Book a Session',
      },
      {
        type: 'paragraph',
        text: 'Ready to take the next step in your international career? Book a free initial consultation with one of our advisors today.',
      },
    ],
  },
};

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const data = SERVICES_DATA[slug];

  if (!data) {
    return (
      <section className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <h1 className="text-primary-blue text-3xl font-bold">Service Not Found</h1>
        <p className="text-muted-foreground">The service you are looking for does not exist.</p>
      </section>
    );
  }

  return <DetailPage data={data} />;
}

export function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({ slug }));
}
