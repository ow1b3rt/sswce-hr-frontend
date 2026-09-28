import { defineEntity } from "@/packages/admin/index.jsx";
import { CalendarClock } from "lucide-react";

export const appointments = defineEntity({
  slug: "appointments",
  label: "Appointments",
  icon: CalendarClock,
  titleField: "title",
  canCreate: false,
  roles: ["admin", "staff"],
  fields: [
    { name: "firstName", type: "text", label: "Name", editable: false },
    { name: "email", type: "text", label: "Email", editable: false },
    { name: "phone", type: "text", label: "Phone", invisible: "true", editable: false },
    { name: "createdAt:date", type: "date", label: "Received at", editable: false },
    { name: "status:status", type: "select", label: "Status" },
    {
      name: "appointmentType",
      type: "text",
      label: "Appointment Type",
      invisible: true,
      editable: false,
    },
    { name: "preferredTime", type: "text", label: "Time", invisible: true, editable: false },
    {
      name: "status",
      type: "select",
      label: "Status",
      invisible: true,
      options: ["pending", "confirmed", "cancelled", "completed"],
    },
    {
      name: "additionalInfo",
      type: "textarea",
      label: "Additional Info",
      invisible: true,
      column: "right",
      editable: false,
    },
  ],
});
