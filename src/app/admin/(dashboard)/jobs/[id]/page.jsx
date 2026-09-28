// src/app/admin/jobs/[id]/page.js
'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  AdminLayout,
  Form,
  ImageUploader,
  Input,
  removeEmptyFields,
  Select,
  Textarea,
  useApi,
  useGet,
  useToast,
} from '@/packages/admin';
import { Loader2 } from 'lucide-react';
import { JobDetailsField } from '@/components/organisms/admin/JobDetailsField.jsx';

const STATUS_OPTIONS = [
  { value: 'open', label: 'Open' },
  { value: 'close', label: 'Closed' },
];

const NEW_JOB_DEFAULTS = {
  location: 'Tokyo, Japan',
  status: 'open',
};

function coerceJsonFields(values, fieldNames) {
  const coerced = { ...values };
  for (const name of fieldNames) {
    if (typeof coerced[name] === 'string' && coerced[name] !== '') {
      try {
        coerced[name] = JSON.parse(coerced[name]);
      } catch {
        coerced[name] = undefined;
      }
    }
  }
  return coerced;
}

export default function JobEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const toast = useToast();
  const { post, patch } = useApi();

  const isNew = id === 'new';
  const apiPath = '/jobs';
  const { data, isLoading } = useGet(isNew ? null : `${apiPath}/${id}`);

  if (!isNew && isLoading) {
    return (
      <AdminLayout title="Job">
        <Loader2 size={18} className="animate-spin text-gray-400" />
        Loading…
      </AdminLayout>
    );
  }

  const defaults = isNew ? NEW_JOB_DEFAULTS : (data?.item ?? {});

  async function handleSubmit(values) {
    let payload = coerceJsonFields(values, ['details']);
    payload = removeEmptyFields(payload);

    const url = isNew ? apiPath : `${apiPath}/${id}`;
    const res = isNew ? await post(url, payload) : await patch(url, payload);

    if (res?.ok) {
      toast.success(`Job ${isNew ? 'created' : 'updated'} successfully`);
      router.replace('/admin/jobs');
    }
    return res;
  }

  return (
    <AdminLayout title={`${isNew ? 'New' : 'Edit'} Job`} formId="job-form">
      <Form
        defaults={defaults}
        id="job-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-6 rounded-sm border border-gray-200 bg-white p-6">
          {/* Top row: content image + core fields side by side */}
          <div className="flex flex-col gap-20 sm:flex-row">
            <div className="w-full max-w-72 sm:flex-1 sm:shrink-0">
              <ImageUploader name="content" caption="Content" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <Input name="title" placeholder="Title" required />

              <div className="flex gap-4">
                <Input name="salary" placeholder="Salary" required />
                <Input name="experience" placeholder="Experience (optional)" />
              </div>

              <div className="flex gap-4">
                <Input name="location" placeholder="Location" required />
                <Input
                  name="workingHours"
                  placeholder="Working hours (optional)"
                />
                <Select name="status" placeholder="Status" required>
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {/* Full-width sections below */}
          <Textarea name="description" placeholder="Description" required />

          <div className="border-t border-gray-100 pt-4">
            <JobDetailsField name="details" caption="Job Details" />
          </div>
        </div>
      </Form>
    </AdminLayout>
  );
}
