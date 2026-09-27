'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

const contactInfo = {
  phone: {
    label: "01-5342506 / 9761521830",
    href: "tel:015342506",
  },
  email: {
    label: "info@sswce.com.np",
    href: "mailto:info@sswce.com.np",
  },
};

export default function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full grid gap-8 lg:grid-cols-3 lg:gap-12">
      {/* Left Column - Company Info */}
      <section className="col-span-1 flex flex-col gap-6">
        <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900">Get in touch</h3>
          <p className="text-sm text-gray-600">
            We love to chat about your travel plans and are happy to talk if you have any questions.
          </p>
          <div className="mt-2 flex flex-col gap-4">
            {contactInfo.phone.label && (
              <Link href={contactInfo.phone.href} className="flex items-center gap-3 text-sm font-bold text-gray-900 hover:text-primary-red transition-colors">
                <Phone size={18} className="text-primary-blue" fill="currentColor" />
                <span>{contactInfo.phone.label}</span>
              </Link>
            )}
            {contactInfo.email.label && (
              <Link href={contactInfo.email.href} className="flex items-center gap-3 text-sm font-bold text-gray-900 hover:text-primary-red transition-colors">
                <Mail size={18} className="text-primary-blue" fill="currentColor" />
                <span className="break-all">{contactInfo.email.label}</span>
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm flex-1">
          <h3 className="text-xl font-bold text-gray-900">Opening Hours</h3>
          <div className="space-y-1 text-gray-600">
            <p className="text-sm">Sunday Through Friday</p>
            <p className="text-sm">8AM - 6PM</p>
          </div>
        </div>
      </section>

      {/* Right Column - Form Inputs */}
      <section className="col-span-2 flex flex-col gap-6 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input required type="text" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-primary-red focus:ring-1 focus:ring-primary-red outline-none" placeholder="First Name*" />
          <input required type="text" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-primary-red focus:ring-1 focus:ring-primary-red outline-none" placeholder="Last Name*" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input required type="email" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-primary-red focus:ring-1 focus:ring-primary-red outline-none" placeholder="Email*" />
          <input required type="tel" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-primary-red focus:ring-1 focus:ring-primary-red outline-none" placeholder="Phone*" />
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <label className="text-base font-bold text-gray-800">
            How can we help?<span className="text-primary-red">*</span>
          </label>
          <textarea required className="w-full flex-1 resize-none rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-primary-red focus:ring-1 focus:ring-primary-red outline-none"></textarea>
        </div>
      </section>

      {/* Submit Button spanning under the right column */}
      <div className="col-span-1 lg:col-start-2 lg:col-span-2 flex justify-end">
        <button type="submit" className="bg-primary-red inline-flex h-12 items-center justify-center gap-2 rounded-full px-10 text-base font-bold text-white transition-colors hover:bg-red-700">
          Submit
        </button>
      </div>
    </form>
  );
}
