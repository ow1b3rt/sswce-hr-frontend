import Link from "next/link";

const DashboardListItem = ({ href, children }) => (
  <Link
    href={href}
    className="group flex items-center justify-between rounded-lg border p-2 transition duration-500 ease-in-out hover:bg-gray-100"
  >
    {children}
  </Link>
);

export default DashboardListItem;
