import DetailPage from '@/components/templates/DetailPage';

// Placeholder data — replace with API call keyed by slug when backend is ready.
const COUNTRIES_DATA = {
  switzerland: {
    title: 'Switzerland',
    image: {
      src: '/flags/switzerland.webp',
      alt: 'Switzerland flag',
    },
    content: [
      {
        type: 'paragraph',
        text: 'Switzerland is one of the most sought-after destinations for skilled international workers. Known for its high standard of living, political neutrality, and stunning Alpine scenery, it offers exceptional opportunities across a range of industries.',
      },
      {
        type: 'heading',
        text: 'Why Work in Switzerland?',
      },
      {
        type: 'list',
        items: [
          'Among the highest average salaries in the world',
          'World-class healthcare and education systems',
          'Strong rule of law and political stability',
          'Multilingual environment — German, French, Italian, and Romansh',
          'Gateway to the rest of Europe',
        ],
      },
      {
        type: 'heading',
        text: 'In-Demand Sectors',
      },
      {
        type: 'list',
        items: [
          'Finance and Banking',
          'Pharmaceuticals and Biotech',
          'Engineering and Manufacturing',
          'Information Technology',
          'Healthcare and Nursing',
        ],
      },
      {
        type: 'heading',
        text: 'Work Permit Overview',
      },
      {
        type: 'paragraph',
        text: 'Switzerland distinguishes between EU/EFTA nationals and third-country nationals when issuing work permits. SSW CE HR specialises in guiding candidates from Nepal, India, and beyond through the Swiss permit process.',
      },
    ],
  },
};

export default async function CountryDetailPage({ params }) {
  const { slug } = await params;
  const data = COUNTRIES_DATA[slug];

  if (!data) {
    return (
      <section className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <h1 className="text-primary-blue text-3xl font-bold">Country Not Found</h1>
        <p className="text-muted-foreground">
          The country page you are looking for does not exist.
        </p>
      </section>
    );
  }

  return <DetailPage data={data} />;
}

export function generateStaticParams() {
  return Object.keys(COUNTRIES_DATA).map((slug) => ({ slug }));
}
