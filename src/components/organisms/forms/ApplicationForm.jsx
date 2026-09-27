'use client';

import { ArrowRight, Loader2 } from 'lucide-react';
import React from 'react';
import AnimatedCard from '@/components/ui/animated-card';
import { AnimatedWords } from '@/components/ui/animated-words';

export default function ApplicationForm({ onSubmit, loading = false }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

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
        {/* Application Details */}
        <AnimatedCard direction="up" distance={12} triggerOnView>
          <section>
            <h2 className="text-primary-blue mb-6 text-2xl font-bold">
              Application Details
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Position Applying For
                </label>
                <div className="relative">
                  <select
                    disabled={loading}
                    className="focus:border-primary-blue focus:ring-primary-blue w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:ring-1"
                  >
                    <option value="">Select a vacancy</option>
                    <option value="engineer">Software Engineer</option>
                    <option value="manager">Project Manager</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Preferred Country
                </label>
                <div className="relative">
                  <select
                    disabled={loading}
                    className="focus:border-primary-blue focus:ring-primary-blue w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:ring-1"
                  >
                    <option value="">Select country</option>
                    <option value="ch">Switzerland</option>
                    <option value="de">Germany</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedCard>

        {/* Application Type */}
        <AnimatedCard direction="up" distance={12} triggerOnView>
          <section>
            <h2 className="text-primary-blue mb-6 text-2xl font-bold">
              Application Type
            </h2>
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="applicationType"
                  value="full-time"
                  disabled={loading}
                  className="accent-secondary-green text-secondary-green border-secondary-green focus:ring-secondary-green h-5 w-5"
                />
                <span className="text-sm font-medium text-gray-700">
                  Full-Time
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="applicationType"
                  value="part-time"
                  disabled={loading}
                  className="accent-secondary-green text-secondary-green border-secondary-green focus:ring-secondary-green h-5 w-5"
                />
                <span className="text-sm font-medium text-gray-700">
                  Part-Time
                </span>
              </label>
            </div>
          </section>
        </AnimatedCard>

        {/* Personal Information */}
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
                  placeholder="Enter your first name"
                  disabled={loading}
                  required
                  className="focus:border-primary-blue focus:ring-primary-blue w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-300 focus:ring-1"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  disabled={loading}
                  required
                  className="focus:border-primary-blue focus:ring-primary-blue w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-300 focus:ring-1"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  disabled={loading}
                  required
                  className="focus:border-primary-blue focus:ring-primary-blue w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-300 focus:ring-1"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  disabled={loading}
                  required
                  className="focus:border-primary-blue focus:ring-primary-blue w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-300 focus:ring-1"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City, Country"
                  disabled={loading}
                  className="focus:border-primary-blue focus:ring-primary-blue w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-300 focus:ring-1"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Date of Birth
                </label>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  disabled={loading}
                  className="focus:border-primary-blue focus:ring-primary-blue w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-300 focus:ring-1"
                />
              </div>
            </div>
          </section>
        </AnimatedCard>

        <hr className="border-t border-gray-300" />

        {/* Education Information */}
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
                    disabled={loading}
                    className="focus:border-primary-blue focus:ring-primary-blue w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:ring-1"
                  >
                    <option value="">Select qualification</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Field of Study
                </label>
                <input
                  type="text"
                  placeholder="Enter your field of study"
                  disabled={loading}
                  className="focus:border-primary-blue focus:ring-primary-blue w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-300 focus:ring-1"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Institution Name
                </label>
                <input
                  type="text"
                  placeholder="Enter institution name"
                  disabled={loading}
                  className="focus:border-primary-blue focus:ring-primary-blue w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-300 focus:ring-1"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Graduation Year
                </label>
                <input
                  type="text"
                  placeholder="Enter year"
                  disabled={loading}
                  className="focus:border-primary-blue focus:ring-primary-blue w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-300 focus:ring-1"
                />
              </div>
            </div>
          </section>
        </AnimatedCard>

        <hr className="border-t border-gray-300" />

        {/* Work Experience */}
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
                      disabled={loading}
                      className="focus:border-primary-blue focus:ring-primary-blue w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:ring-1"
                    >
                      <option value="">Select years of experience</option>
                      <option value="1">1 Year</option>
                      <option value="2-3">2-3 Years</option>
                      <option value="5+">5+ Years</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-800">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Enter company name"
                    disabled={loading}
                    className="focus:border-primary-blue focus:ring-primary-blue w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-300 focus:ring-1"
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
                    placeholder="Enter your job title"
                    disabled={loading}
                    className="focus:border-primary-blue focus:ring-primary-blue w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-300 focus:ring-1"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-800">
                    Relevant Experience
                  </label>
                  <textarea
                    placeholder="Briefly describe your relevant experience"
                    disabled={loading}
                    className="focus:border-primary-blue focus:ring-primary-blue h-32 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-300 focus:ring-1"
                  ></textarea>
                </div>
              </div>
            </div>
          </section>
        </AnimatedCard>

        <hr className="border-t border-gray-300" />

        {/* CV / Resume */}
        <AnimatedCard direction="up" distance={12} triggerOnView>
          <section className="flex items-center gap-6">
            <h2 className="text-primary-blue w-32 shrink-0 text-xl font-bold md:text-2xl">
              CV / Resume
            </h2>
            <div className="flex-1">
              <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-gray-50 px-6 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-100">
                <span>Upload a file</span>
                <input type="file" className="hidden" disabled={loading} />
              </label>
            </div>
          </section>
        </AnimatedCard>

        <hr className="border-t border-gray-300" />

        {/* Declaration */}
        <AnimatedCard direction="up" distance={12} triggerOnView>
          <section>
            <h2 className="text-primary-blue mb-6 text-2xl font-bold">
              Declaration
            </h2>
            <label className="flex cursor-pointer items-start gap-4">
              <input
                type="checkbox"
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

        {/* Submit Button */}
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
