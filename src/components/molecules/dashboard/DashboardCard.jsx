import Image from "next/image";
import Link from "next/link";

const DashboardCard = ({ icon, title, count, viewAllHref, children }) => {
  if (!count || count <= 0) return null;

  return (
    <div className="flex h-full max-w-120 flex-col gap-4 rounded-lg border bg-white px-4 py-3 shadow-md">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Image
            src={icon}
            alt={title}
            width={400}
            height={400}
            className="h-16 w-16 rounded-xl p-2"
          />
          <h2 className="flex items-center justify-between text-2xl font-semibold">
            {title}
            <span className="bg-primary-red ml-2 rounded-full px-2.5 py-1 text-sm text-white">
              {count}
            </span>
          </h2>
        </div>

        <Link
          href={viewAllHref}
          className="text-primary-green-dark hover:text-primary-green text-base"
        >
          View all
        </Link>
      </div>

      <div className="flex max-h-48 flex-col gap-4 overflow-y-scroll rounded-lg">{children}</div>
    </div>
  );
};

export default DashboardCard;
