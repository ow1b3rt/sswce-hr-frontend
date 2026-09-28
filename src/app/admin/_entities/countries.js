import { defineEntity } from "@/packages/admin/index.jsx";
import { Globe } from "lucide-react";

export const countries = defineEntity({
  slug: "countries",
  label: "Countries",
  icon: Globe,
  titleField: "name",
  roles: ["admin", "staff"],
  fields: [{ name: "name", type: "text", label: "Name", required: true }],
});
