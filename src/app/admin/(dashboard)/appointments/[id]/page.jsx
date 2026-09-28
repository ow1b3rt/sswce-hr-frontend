"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminLayout, useApi, useGet, useToast } from "@/packages/admin";
import {
  CalendarClock,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Clock,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Target,
} from "lucide-react";

const STATUS_SELECT_STYLES = {
  warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
  success: "border-green-200 bg-green-50 text-green-800",
  danger: "border-red-200 bg-red-50 text-red-800",
  primary: "border-blue-200 bg-blue-50 text-blue-800",
  default: "border-gray-200 bg-gray-50 text-gray-700",
};

const STATUS_LABEL = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  completed: "Completed",
};

function FieldTile({ icon: Icon, label, value, fullWidth = false }) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm ${fullWidth ? "sm:col-span-2" : ""}`}
    >
      <div className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-gray-500 uppercase">
        {Icon && <Icon size={14} className="text-gray-400" />}
        {label}
      </div>
      <div className="mt-2 text-sm whitespace-pre-wrap text-gray-900">
        {value || <span className="text-gray-400">—</span>}
      </div>
    </div>
  );
}

function formatDate(value) {
  if (!value) return null;
  return new Date(value).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusSelect({ defaultValue, disabled }) {
  const styleKey = STATUS_LABEL[defaultValue] ? defaultValue : "default";

  return (
    <div className="relative shrink-0">
      <select
        name="status"
        defaultValue={defaultValue}
        disabled={disabled}
        className={`cursor-pointer appearance-none rounded-full border px-4 py-1.5 pr-8 text-sm font-medium capitalize transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-60 ${STATUS_SELECT_STYLES[styleKey]}`}
      >
        {Object.entries(STATUS_LABEL).map(([val, label]) => (
          <option key={val} value={val}>
            {label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}

export default function AppointmentDetailPage() {
  const { id } = useParams();
  const { data, loading } = useGet(`/appointments/${id}`);
  const toast = useToast();
  const { patch } = useApi();
  const router = useRouter();
  const record = data?.item;
  const status = record?.status ?? "pending";

  const [saving, setSaving] = useState(false);

  const fullName = record ? [record.firstName, record.lastName].filter(Boolean).join(" ") : "";

  async function handleSubmit(e) {
    e.preventDefault();
    const next = new FormData(e.target).get("status");
    if (!next || next === status) return;

    setSaving(true);
    try {
      const res = await patch(`/appointments/${id}`, { status: next });
      if (res) {
        toast.success("Appointment status updated successfully");
        router.replace("/admin/appointments");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminLayout title={fullName || "Appointment"} formId="appointment-status-form">
      {loading ? (
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500 shadow-sm">
          <Loader2 size={18} className="animate-spin text-gray-400" />
          Loading…
        </div>
      ) : !record ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500 shadow-sm">
          Record not found.
        </div>
      ) : (
        <form
          id="appointment-status-form"
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-5"
        >
          {/* Header card */}
          <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white">
              <CalendarClock size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-lg font-semibold text-gray-900">
                {fullName || "Appointment"}
              </h2>
              <p className="truncate text-sm text-gray-500">{record.email}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              {saving && <Loader2 size={16} className="animate-spin text-gray-400" />}
              <StatusSelect defaultValue={status} key={status} disabled={saving} />
            </div>
          </div>

          {/* Info grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldTile icon={Mail} label="Email" value={record.email} />
            <FieldTile icon={Phone} label="Phone" value={record.phone} />
            <FieldTile icon={MapPin} label="Location" value={record.location} />
            <FieldTile icon={Target} label="Purpose" value={record.purpose} />
            <FieldTile
              icon={ClipboardList}
              label="Appointment Type"
              value={record.appointmentType}
            />
            <FieldTile icon={Clock} label="Preferred Time" value={record.preferredTime} />
            <FieldTile
              icon={CalendarDays}
              label="Received at"
              value={formatDate(record.createdAt)}
            />
            <FieldTile
              icon={FileText}
              label="Additional Info"
              value={record.additionalInfo}
              fullWidth
            />
          </div>
        </form>
      )}
    </AdminLayout>
  );
}
