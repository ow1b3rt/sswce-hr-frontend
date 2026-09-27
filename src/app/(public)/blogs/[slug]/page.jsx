import DetailPage from '@/components/templates/DetailPage';

// Placeholder data — replace with API call keyed by slug when backend is ready.
const BLOGS_DATA = {
  'how-to-land-your-first-job-abroad': {
    title: 'How to Land Your First Job Abroad',
    content: [
      {
        type: 'paragraph',
        text: 'Finding your first international job can feel overwhelming, but with the right approach it becomes a manageable and exciting journey.',
      },
      {
        type: 'heading',
        text: 'Build a Global-Ready CV',
      },
      {
        type: 'paragraph',
        text: 'Your CV needs to speak the language of international recruiters. Keep it concise — ideally two pages — and lead with a strong professional summary that highlights your transferable skills.',
      },
      {
        type: 'heading',
        text: 'Ace Cross-Cultural Interviews',
      },
      {
        type: 'paragraph',
        text: 'Research the culture of the country you are applying to. Understanding communication styles and workplace norms will set you apart from other candidates.',
      },
      {
        type: 'list',
        items: [
          'Research visa requirements before applying',
          'Network on LinkedIn with professionals in your target country',
          'Consider working with a reputable recruitment agency like SSW CE HR',
        ],
      },
    ],
  },
  'top-5-countries-for-skilled-workers-in-2026': {
    title: 'Top 5 Countries for Skilled Workers in 2026',
    content: [
      {
        type: 'paragraph',
        text: 'The global demand for skilled professionals continues to grow. Here are the top destinations for ambitious workers in 2026.',
      },
      {
        type: 'heading',
        text: '1. Switzerland',
      },
      {
        type: 'paragraph',
        text: 'Switzerland remains a top choice for skilled professionals due to its high salaries, quality of life, and stable economy.',
      },
      {
        type: 'heading',
        text: '2. Germany',
      },
      {
        type: 'paragraph',
        text: 'Germany has introduced new Skilled Immigration Act provisions, making it easier than ever for qualified professionals to relocate.',
      },
      {
        type: 'heading',
        text: '3. Canada',
      },
      {
        type: 'paragraph',
        text: "Canada's Express Entry system continues to attract skilled workers with competitive points and streamlined processing.",
      },
      {
        type: 'heading',
        text: '4. Australia',
      },
      {
        type: 'paragraph',
        text: 'Australia offers strong demand in healthcare, engineering, and technology sectors with clear visa pathways.',
      },
      {
        type: 'heading',
        text: '5. UAE',
      },
      {
        type: 'paragraph',
        text: 'The UAE offers tax-free income, a booming economy, and a wealth of opportunities in finance, tech, and construction.',
      },
    ],
  },
  'understanding-swiss-work-permits': {
    title: 'Understanding Swiss Work Permits',
    content: [
      {
        type: 'paragraph',
        text: 'Switzerland has one of the most structured work permit systems in the world. Understanding which permit applies to you is the first step.',
      },
      {
        type: 'heading',
        text: 'Permit L – Short-Term Residence',
      },
      {
        type: 'paragraph',
        text: 'Valid for up to one year. Suitable for seasonal workers and short-term employment contracts.',
      },
      {
        type: 'heading',
        text: 'Permit B – Annual Residence',
      },
      {
        type: 'paragraph',
        text: 'Granted for one year initially and renewable. Required when you have a fixed-term employment contract of more than one year.',
      },
      {
        type: 'heading',
        text: 'Permit C – Settlement',
      },
      {
        type: 'paragraph',
        text: 'Granted after living in Switzerland for 5–10 years. Provides the most rights and is not tied to a specific employer.',
      },
      {
        type: 'heading',
        text: 'How SSW CE HR Can Help',
      },
      {
        type: 'paragraph',
        text: 'Our expert team has guided hundreds of candidates through the Swiss permit process. Contact us today to get started.',
      },
    ],
  },
};

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const data = BLOGS_DATA[slug];

  if (!data) {
    return (
      <section className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <h1 className="text-primary-blue text-3xl font-bold">Blog Not Found</h1>
        <p className="text-muted-foreground">
          The blog post you are looking for does not exist.
        </p>
      </section>
    );
  }

  return <DetailPage data={data} />;
}

export function generateStaticParams() {
  return Object.keys(BLOGS_DATA).map((slug) => ({ slug }));
}
