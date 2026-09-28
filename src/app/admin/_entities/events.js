import { defineEntity } from "@/packages/admin/index.jsx";
import { Bell } from "lucide-react";

export const events = defineEntity({
  slug: "events",
  label: "Events",
  icon: Bell,
  titleField: "title",
  roles: ["admin", "staff"],
  fields: [
    { name: "title", type: "text", label: "Title", required: true },

    { name: "slug", type: "text", label: "Slug", required: true },

    { name: "description", type: "textarea", label: "Description" },
    {
      name: "content:image",
      type: "image",
      label: "File",
      invisible: true,
      column: "right",
    },
    {
      name: "time:date",
      type: "date-time",
      label: "Event Time",
      required: true,
      column: "right",
    },
    {
      name: "location",
      type: "text",
      label: "Location",
      column: "right",
    },
  ],
});
