import { defineEntity } from "@/packages/admin/index.jsx";
import { Newspaper } from "lucide-react";

export const faqs = defineEntity({
  slug: "faqs",
  label: "FAQs",
  icon: Newspaper,
  titleField: "question",
  roles: ["admin"],
  fields: [{ name: "question:bold", type: "text", label: "Question", required: true }],
  filters: [],
});
