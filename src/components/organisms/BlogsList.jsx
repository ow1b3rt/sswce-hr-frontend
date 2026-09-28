"use client";

import { AutoCarousel } from "@/components/molecules/AutoCarousel";
import { HomeBlogCard } from "@/components/molecules/cards/HomeBlogCard";
import { TestimonialCard } from "@/components/molecules/cards/TestimonialCard";

const BlogsList = ({ title = " Latest News & Blogs", blogs }) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <h5 className="text-2xl leading-normal font-bold lg:text-4xl">{title}</h5>
      {blogs && blogs.length > 0 && (
        <AutoCarousel
          items={blogs}
          transition="slide"
          itemClassName="flex items-stretch w-full justify-center basis-full sm:basis-1/2 lg:basis-1/3 md:px-7"
          renderItem={(blog, index) => <HomeBlogCard section={blog} key={index} />}
          transitionDuration={500}
          loop={true}
          showControls={true}
          showChevronControls={false}
          showGradientMask={false}
        />
      )}
    </div>
  );
};

export default BlogsList;
