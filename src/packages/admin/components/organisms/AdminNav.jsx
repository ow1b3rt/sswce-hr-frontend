"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

export function AdminNav({ items, panel }) {
  const pathname = usePathname();
  const visibleitems = {
    dashboard: {
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    ...items,
  };

  return (
    <ul className="flex flex-col gap-1">
      {Object.entries(visibleitems ?? {}).map(([key, value]) => {
        const isactive = pathname.startsWith("/admin/" + key);
        return (
          <li key={key} title={key} className="w-full outline-none">
            <Link href={`/admin/${key}`} className="block w-full">
              <div
                className={`flex items-center gap-3 rounded-b-lg p-2 pl-4 text-sm font-medium transition-colors duration-500 ${
                  isactive
                    ? " bg-primary-green text-white shadow-sm"
                    : "border-transparent text-white hover:bg-black hover:text-white"
                } ${panel ? "" : "justify-center pl-0!"}`}
              >
                <value.icon size={18} className={isactive ? "text-white" : "text-white"} />
                {panel && <span>{value.label}</span>}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
