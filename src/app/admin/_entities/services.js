import { defineEntity } from "@/packages/admin/index.jsx";
import { Cog } from "lucide-react";

export const services = defineEntity({
  slug: "sections/services",
  label: "Services",
  icon: Cog,
  titleField: "title",
  roles: ["admin"],
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "image",
      type: "image",
      label: "Image",
      column: "right",
    },
  ],
  filters: [],
});
