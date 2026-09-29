// src/app/admin/applications/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { AdminLayout, useApi, useGet, useToast } from '@/packages/admin';
import { FileText, Loader2 } from 'lucide-react';
import { resolveUrl } from '@/lib/utils';

const SECTIONS = [
  {
    title: 'Application',
    fields: [
      { key: 'position', label: 'Position' },
      { key: 'preferredCountry', label: 'Preferred country' },
      { key: 'applicationType', label: 'Application type' },
    ],
  },
  {
    title: 'Personal Information',
    fields: [
      { key: 'firstName', label: 'First name' },
      { key: 'lastName', label: 'Last name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'location', label: 'Location' },
      { key: 'dateOfBirth', label: 'Date of birth' },
    ],
  },
  {
    title: 'Education',
    fields: [
      { key: 'highestQualification', label: 'Highest qualification' },
      { key: 'fieldOfStudy', label: 'Field of study' },
      { key: 'institutionName', label: 'Institution' },
      { key: 'graduationYear', label: 'Graduation year' },
    ],
  },
  {
    title: 'Experience',
    fields: [
      { key: 'totalExperience', label: 'Total experience' },
      { key: 'currentPosition', label: 'Current position' },
      { key: 'companyName', label: 'Company' },
      { key: 'relevantExperience', label: 'Relevant experience', wide: true },
    ],
  },
];

// Must match the values your API accepts for `status`
const STATUS_OPTIONS = ['pending', 'confirmed', 'cancelled', 'completed'];

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const formatDateTime = (value) =>
  value ? new Date(value).toLocaleString() : '—';

function getFileKind(file) {
  const type = file?.mimeType ?? '';
  const name = (file?.filename ?? file?.url ?? '').split('?')[0].toLowerCase();

  if (type.startsWith('image/') || /\.(png|jpe?g|webp|gif|avif)$/.test(name))
    return 'image';
  if (type === 'application/pdf' || name.endsWith('.pdf')) return 'pdf';
  return 'other';
}

function Field({ label, value, wide }) {
  return (
    <div className={`flex flex-col gap-1 ${wide ? 'sm:col-span-2' : ''}`}>
      <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
        {label}
      </span>
      <span className="text-sm whitespace-pre-wrap text-gray-900">
        {value || '—'}
      </span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="flex flex-col gap-4 rounded-sm border border-gray-200 bg-white p-6">
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {children}
      </div>
    </section>
  );
}

export default function ApplicationViewPage() {
  const { id } = useParams();
  const toast = useToast();
  const { patch } = useApi();
  const apiPath = '/appointments';

  const { data, isLoading } = useGet(`${apiPath}/${id}`);
  const item = data?.item;
  const { data: mediaData, isLoading: mediaLoading } = useGet(
    item?.cvMediaId ? `/media/${item.cvMediaId}` : null,
  );
  const cv = mediaData?.item;
  const cvUrl = cv?.url ? resolveUrl(cv.url) : null;
  const cvKind = getFileKind(cv);

  // `status` is the dropdown value, `savedStatus` is what the server has
  const [status, setStatus] = useState('');
  const [savedStatus, setSavedStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (item?.status) {
      setStatus(item.status);
      setSavedStatus(item.status);
    }
  }, [item]);

  async function handleStatusSave() {
    setSaving(true);
    try {
      const res = await patch(`${apiPath}/${id}`, { status });
      if (res?.ok) {
        setSavedStatus(status);
        toast.success('Status updated successfully');
      }
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) {
    return (
      <AdminLayout title="Application">
        <Loader2 size={18} className="animate-spin text-gray-400" />
        Loading…
      </AdminLayout>
    );
  }

  if (!item) {
    return (
      <AdminLayout title="Application">
        <p className="text-sm text-gray-500">Application not found.</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`${item.firstName} ${item.lastName}`}>
      <div className="flex flex-col gap-6">
        {/* Status + submitted date */}
        <div className="flex flex-wrap items-center gap-4 rounded-sm border border-gray-200 bg-white p-6">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
              STATUS_STYLES[savedStatus] ?? 'bg-gray-100 text-gray-700'
            }`}
          >
            {savedStatus}
          </span>
          <span className="text-sm text-gray-500">
            Submitted {formatDateTime(item.createdAt)}
          </span>

          <div className="ml-auto flex items-center gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={saving}
              className="rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 capitalize shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleStatusSave}
              disabled={saving || status === savedStatus}
              className="bg-primary-green hover:bg-primary-green/50 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              Update status
            </button>
          </div>
        </div>

        {SECTIONS.map(({ title, fields }) => (
          <Section key={title} title={title}>
            {fields.map(({ key, label, wide }) => (
              <Field key={key} label={label} value={item[key]} wide={wide} />
            ))}
          </Section>
        ))}

        {/* CV + declaration */}
        <Section title="Documents">
          <div className="flex flex-col gap-3 sm:col-span-2">
            <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
              CV
            </span>

            {!item.cvMediaId ? (
              <span className="text-sm text-gray-900">—</span>
            ) : mediaLoading ? (
              <Loader2 size={16} className="animate-spin text-gray-400" />
            ) : cvUrl ? (
              <>
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-fit items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 shadow-sm transition-colors hover:border-indigo-500 hover:text-indigo-500"
                >
                  <FileText size={16} />
                  {cv.filename ?? 'Open CV in new tab'}
                </a>

                {cvKind === 'image' && (
                  <div className="relative h-[560px] w-full overflow-hidden rounded-sm border border-gray-200 bg-gray-50">
                    <Image
                      src={cvUrl}
                      alt="CV preview"
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                )}

                {cvKind === 'pdf' && (
                  <iframe
                    src={cvUrl}
                    title="CV preview"
                    className="h-[720px] w-full rounded-sm border border-gray-200"
                  />
                )}

                {cvKind === 'other' && (
                  <p className="text-sm text-gray-500">
                    Preview isn't available for this file type. Use the link
                    above to open it.
                  </p>
                )}
              </>
            ) : (
              <span className="text-sm text-gray-500">CV file unavailable</span>
            )}
          </div>

          <Field
            label="Declaration accepted"
            value={item.declarationAccepted ? 'Yes' : 'No'}
          />
        </Section>
      </div>
    </AdminLayout>
  );
}
