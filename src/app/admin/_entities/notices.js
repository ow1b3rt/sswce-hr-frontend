import { defineEntity } from "@/packages/admin/index.jsx";
import { Bell } from "lucide-react";

export const notices = defineEntity({
  slug: "notices",
  label: "Notices",
  icon: Bell,
  titleField: "title",
  roles: ["admin", "staff"],
  fields: [
    { name: "title", type: "text", label: "Title", required: true },
    { name: "description", type: "textarea", label: "Description" },
    {
      name: "content:image",
      type: "image",
      label: "File",
      invisible: true,
      column: "right",
    },
  ],
});
