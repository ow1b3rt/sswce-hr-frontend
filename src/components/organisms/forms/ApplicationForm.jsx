'use client';

import { ArrowRight, Loader2, Paperclip, X } from 'lucide-react';
import React, { useState } from 'react';
import AnimatedCard from '@/components/ui/animated-card';
import { AnimatedWords } from '@/components/ui/animated-words';
import { ROUTES } from '@/constants/routes/routes';
import { toast } from '@/components/ui/toast';

/* -------------------------------------------------------------------------- */
/*  Static option sets                                                         */
/* -------------------------------------------------------------------------- */

const POSITIONS = [
  { value: 'caregiver', label: 'Caregiver' },
  { value: 'construction-worker', label: 'Construction Worker' },
  { value: 'agriculture-worker', label: 'Agriculture Worker' },
  { value: 'food-service', label: 'Food Service' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'hospitality', label: 'Hospitality' },
];

const COUNTRIES = [
  { value: 'Japan', label: 'Japan' },
  { value: 'South Korea', label: 'South Korea' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Canada', label: 'Canada' },
];

const QUALIFICATIONS = [
  { value: 'slc', label: 'SLC / SEE' },
  { value: 'plus-two', label: '+2 / Intermediate' },
  { value: 'bachelors', label: "Bachelor's Degree" },
  { value: 'masters', label: "Master's Degree" },
  { value: 'other', label: 'Other' },
];

const EXPERIENCE_YEARS = [
  { value: 'fresher', label: 'Fresher (No experience)' },
  { value: '1', label: '1 Year' },
  { value: '2-3', label: '2–3 Years' },
  { value: '4-5', label: '4–5 Years' },
  { value: '5+', label: '5+ Years' },
];

const PHONE_REGEX = /^(\d{10}|\+\d{1,13}|\+\d{1,3} \d{10})$/;

/* -------------------------------------------------------------------------- */
/*  Shared input / select class                                                */
/* -------------------------------------------------------------------------- */

const inputCls =
  'focus:border-primary-blue focus:ring-primary-blue w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-300 focus:ring-1 disabled:opacity-50';

const selectCls =
  'focus:border-primary-blue focus:ring-primary-blue w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:ring-1 disabled:opacity-50';

const ChevronDown = () => (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
    </svg>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

const INITIAL = {
  position: '',
  preferredCountry: '',
  applicationType: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  dateOfBirth: '',
  highestQualification: '',
  fieldOfStudy: '',
  institutionName: '',
  graduationYear: '',
  totalExperience: '',
  currentPosition: '',
  companyName: '',
  relevantExperience: '',
  declarationAccepted: false,
};

export default function ApplicationForm() {
  const [form, setForm] = useState(INITIAL);
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ---- field handlers ---------------------------------------------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setCvFile(file);
  };

  const removeFile = () => {
    setCvFile(null);
  };

  /* ---- submit ------------------------------------------------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.firstName.trim() || !form.lastName.trim()) {
      toast.add({
        type: 'error',
        description: 'First and last name are required.',
      });
      return;
    }
    if (!PHONE_REGEX.test(form.phone)) {
      toast.add({
        type: 'error',
        description:
          "Phone must be 10 digits, or '+' followed by country code (e.g. +9779812345678).",
      });
      return;
    }
    if (!form.declarationAccepted) {
      toast.add({
        type: 'error',
        description: 'Please accept the declaration to proceed.',
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Append all text fields
      Object.entries(form).forEach(([key, value]) => {
        formData.append(
          key,
          value === null || value === undefined ? '' : String(value),
        );
      });

      // Append CV file under the "documents" field name (matches multer)
      if (cvFile) {
        formData.append('documents', cvFile);
      }

      const res = await fetch(ROUTES.API.APPOINTMENTS, {
        method: 'POST',
        body: formData,
        credentials: 'omit',
      });

      const result = await res.json();

      if (!res.ok) {
        const msg =
          result?.message ||
          (result?.error?.details && typeof result.error.details === 'object'
            ? Object.values(result.error.details).flat()[0]
            : undefined) ||
          'Submission failed. Please try again.';
        throw new Error(msg);
      }

      toast.add({
        type: 'success',
        description:
          'Application submitted successfully! We will contact you soon.',
      });

      setForm(INITIAL);
      setCvFile(null);
    } catch (err) {
      toast.add({
        type: 'error',
        description: err?.message || 'Something went wrong.',
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---- render ------------------------------------------------------------ */
  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-6 md:p-10">
      <h1 className="text-primary-red mb-12 text-center text-4xl font-black md:text-5xl">
        <AnimatedWords
          text="Online Application"
          animKey="applicationTitle"
          durationMs={800}
          staggerMs={80}
          direction="up"
        />
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* ── Application Details ────────────────────────────────────── */}
        <AnimatedCard direction="up" distance={12} triggerOnView>
          <section>
            <h2 className="text-primary-blue mb-6 text-2xl font-bold">
              Application Details
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Position */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Position Applying For
                </label>
                <div className="relative">
                  <select
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    disabled={loading}
                    className={selectCls}
                  >
                    <option value="">Select a vacancy</option>
                    {POSITIONS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown />
                </div>
              </div>

              {/* Preferred Country */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Preferred Country
                </label>
                <div className="relative">
                  <select
                    name="preferredCountry"
                    value={form.preferredCountry}
                    onChange={handleChange}
                    disabled={loading}
                    className={selectCls}
                  >
                    <option value="">Select country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown />
                </div>
              </div>
            </div>
          </section>
        </AnimatedCard>

        {/* ── Application Type ───────────────────────────────────────── */}
        <AnimatedCard direction="up" distance={12} triggerOnView>
          <section>
            <h2 className="text-primary-blue mb-6 text-2xl font-bold">
              Application Type
            </h2>
            <div className="space-y-3">
              {[
                { value: 'full-time', label: 'Full-Time' },
                { value: 'part-time', label: 'Part-Time' },
              ].map(({ value, label }) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <input
                    type="radio"
                    name="applicationType"
                    value={value}
                    checked={form.applicationType === value}
                    onChange={handleChange}
                    disabled={loading}
                    className="accent-secondary-green text-secondary-green border-secondary-green focus:ring-secondary-green h-5 w-5"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </section>
        </AnimatedCard>

        {/* ── Personal Information ────────────────────────────────────── */}
        <AnimatedCard direction="up" distance={12} triggerOnView>
          <section>
            <h2 className="text-primary-blue mb-6 text-2xl font-bold">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  disabled={loading}
                  required
                  className={inputCls}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  disabled={loading}
                  required
                  className={inputCls}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  disabled={loading}
                  required
                  className={inputCls}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  disabled={loading}
                  required
                  pattern="(\d{10}|\+[0-9]{1,13}|\+[0-9]{1,3} [0-9]{10})"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  disabled={loading}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Date of Birth
                </label>
                <input
                  type="text"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  placeholder="DD/MM/YYYY"
                  disabled={loading}
                  className={inputCls}
                />
              </div>
            </div>
          </section>
        </AnimatedCard>

        <hr className="border-t border-gray-300" />

        {/* ── Education Information ───────────────────────────────────── */}
        <AnimatedCard direction="up" distance={12} triggerOnView>
          <section>
            <h2 className="text-primary-blue mb-6 text-2xl font-bold">
              Education Information
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Highest Qualification
                </label>
                <div className="relative">
                  <select
                    name="highestQualification"
                    value={form.highestQualification}
                    onChange={handleChange}
                    disabled={loading}
                    className={selectCls}
                  >
                    <option value="">Select qualification</option>
                    {QUALIFICATIONS.map((q) => (
                      <option key={q.value} value={q.value}>
                        {q.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Field of Study
                </label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={form.fieldOfStudy}
                  onChange={handleChange}
                  placeholder="Enter your field of study"
                  disabled={loading}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Institution Name
                </label>
                <input
                  type="text"
                  name="institutionName"
                  value={form.institutionName}
                  onChange={handleChange}
                  placeholder="Enter institution name"
                  disabled={loading}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Graduation Year
                </label>
                <input
                  type="text"
                  name="graduationYear"
                  value={form.graduationYear}
                  onChange={handleChange}
                  placeholder="Enter year"
                  disabled={loading}
                  className={inputCls}
                />
              </div>
            </div>
          </section>
        </AnimatedCard>

        <hr className="border-t border-gray-300" />

        {/* ── Work Experience ─────────────────────────────────────────── */}
        <AnimatedCard direction="up" distance={12} triggerOnView>
          <section>
            <h2 className="text-primary-blue mb-6 text-2xl font-bold">
              Work Experience
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-800">
                    Total Experience
                  </label>
                  <div className="relative">
                    <select
                      name="totalExperience"
                      value={form.totalExperience}
                      onChange={handleChange}
                      disabled={loading}
                      className={selectCls}
                    >
                      <option value="">Select years of experience</option>
                      {EXPERIENCE_YEARS.map((e) => (
                        <option key={e.value} value={e.value}>
                          {e.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-800">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    disabled={loading}
                    className={inputCls}
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-800">
                    Current/Previous Position
                  </label>
                  <input
                    type="text"
                    name="currentPosition"
                    value={form.currentPosition}
                    onChange={handleChange}
                    placeholder="Enter your job title"
                    disabled={loading}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-800">
                    Relevant Experience
                  </label>
                  <textarea
                    name="relevantExperience"
                    value={form.relevantExperience}
                    onChange={handleChange}
                    placeholder="Briefly describe your relevant experience"
                    disabled={loading}
                    className={`${inputCls} h-32 resize-none`}
                  />
                </div>
              </div>
            </div>
          </section>
        </AnimatedCard>

        <hr className="border-t border-gray-300" />

        {/* ── CV / Resume ─────────────────────────────────────────────── */}
        <AnimatedCard direction="up" distance={12} triggerOnView>
          <section className="flex flex-wrap items-center gap-6">
            <h2 className="text-primary-blue w-32 shrink-0 text-xl font-bold md:text-2xl">
              CV / Resume
            </h2>
            <div className="flex flex-1 flex-wrap items-center gap-3">
              {cvFile ? (
                <div className="flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-sm font-medium text-green-800">
                  <Paperclip size={14} />
                  <span className="max-w-[200px] truncate">{cvFile.name}</span>
                  <button
                    type="button"
                    onClick={removeFile}
                    disabled={loading}
                    className="ml-1 text-green-600 hover:text-red-500"
                    aria-label="Remove file"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-6 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-100">
                  <Paperclip size={14} />
                  <span>Upload a file</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    disabled={loading}
                    onChange={handleFileChange}
                  />
                </label>
              )}
              <p className="text-xs text-gray-400">PDF or DOCX, max 20 MB</p>
            </div>
          </section>
        </AnimatedCard>

        <hr className="border-t border-gray-300" />

        {/* ── Declaration ─────────────────────────────────────────────── */}
        <AnimatedCard direction="up" distance={12} triggerOnView>
          <section>
            <h2 className="text-primary-blue mb-6 text-2xl font-bold">
              Declaration
            </h2>
            <label className="flex cursor-pointer items-start gap-4">
              <input
                type="checkbox"
                name="declarationAccepted"
                checked={form.declarationAccepted}
                onChange={handleChange}
                disabled={loading}
                required
                className="accent-secondary-green border-secondary-green text-secondary-green focus:ring-secondary-green mt-1 h-5 w-5 cursor-pointer rounded border-2"
              />
              <span className="text-sm font-medium text-gray-800 md:text-base">
                I confirm that the information provided is accurate and that I
                agree to the application terms and requirements.
              </span>
            </label>
          </section>
        </AnimatedCard>

        {/* ── Submit ──────────────────────────────────────────────────── */}
        <AnimatedCard direction="up" distance={12} triggerOnView>
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-secondary-green inline-flex h-12 items-center gap-2 rounded-lg px-8 text-base font-bold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit
                  <ArrowRight size={18} strokeWidth={3} />
                </>
              )}
            </button>
          </div>
        </AnimatedCard>
      </form>
    </div>
  );
}
