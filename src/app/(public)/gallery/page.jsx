import { fetcher } from "@/packages/admin";
import SafeImage from "@/components/ui/safe-image";
import AnimatedCard from "@/components/ui/animated-card";
import { AnimatedHeading } from "@/components/atoms/headings";

export default async function GalleryPage() {
  const data = await fetcher("/layouts/gallery")
  const items = data?.layout?.items || []

  let columns = [[], [], []]
  items.forEach((item, index) => {
    columns[index % 3].push(item)
  })

  return (
    <div className='flex flex-col gap-6 py-6'>
      <AnimatedHeading text='Gallery' />
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className='flex flex-col gap-6'>
            {column.map((item, itemIndex) => (
              <AnimatedCard
                key={itemIndex}
                distance={12}
                triggerOnView
                direction='up'
              >
                <SafeImage
                  src={item.image.src}
                  alt={item.image.alt}
                  width={0}
                  height={0}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='h-auto w-full rounded-lg object-contain'
                />
              </AnimatedCard>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
