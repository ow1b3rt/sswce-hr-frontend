'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, Loader2 } from 'lucide-react';
import { ROUTES } from '@/constants/routes/routes';
import { toast } from '@/components/ui/toast';
import { submitForm } from '@/lib/helpers/form-submit';

const contactInfo = {
  phone: {
    label: '01-5921567 / 985-1248716',
    href: 'tel:015921567',
  },
  email: {
    label: 'sswcehumanresources@gmail.com',
    href: 'mailto:sswcehumanresources@gmail.com',
  },
};

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.add({
        type: 'error',
        description: 'Please fill in all fields.',
      });
      return;
    }

    if (!/^(\d{10}|\+\d{1,13}|\+\d{1,3} \d{10})$/.test(form.phone)) {
      toast.add({
        type: 'error',
        description:
          "Mobile number must be exactly 10 digits, or a '+' followed by country code (e.g. +9771234567890 or +977 1234567890).",
      });
      return;
    }

    setLoading(true);

    await submitForm({
      url: ROUTES.API.CONTACT,
      data: form,
      onSuccess: () => {
        toast.add({
          type: 'success',
          description:
            'Message sent successfully! We will get back to you soon.',
        });

        setForm({
          name: '',
          email: '',
          subject: '',
          phone: '',
          message: '',
        });
      },
      onError: (error) => {
        toast.add({
          type: 'error',
          description:
            error?.message || 'Unable to send your message. Please try again.',
        });
      },
    });

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full gap-8 lg:grid-cols-3 lg:gap-12"
    >
      {/* Left Column - Company Info */}
      <section className="col-span-1 flex flex-col gap-6">
        <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 lg:text-2xl">
            Get in touch
          </h3>
          <p className="text-sm text-gray-600 lg:text-xl">
            We would love to hear from you and are happy to talk if you
            have any questions.
          </p>
          <div className="mt-2 flex flex-col gap-4">
            {contactInfo.phone.label && (
              <Link
                href={contactInfo.phone.href}
                className="hover:text-primary-red flex items-center gap-3 text-sm font-bold text-gray-900 transition-colors lg:text-xl"
              >
                <Phone
                  size={18}
                  className="text-primary-blue size-4 lg:size-6"
                  fill="currentColor"
                />
                <span>{contactInfo.phone.label}</span>
              </Link>
            )}
            {contactInfo.email.label && (
              <Link
                href={contactInfo.email.href}
                className="hover:text-primary-red flex items-center gap-3 text-sm font-bold text-gray-900 transition-colors lg:text-xl"
              >
                <Mail
                  size={18}
                  className="text-primary-blue size-4 lg:size-6"
                />
                <span className="break-all">{contactInfo.email.label}</span>
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 lg:text-2xl">
            Opening Hours
          </h3>
          <div className="space-y-1 text-gray-600">
            <p className="text-sm lg:text-xl">Sunday Through Friday</p>
            <p className="text-sm lg:text-xl">9AM - 6PM</p>
          </div>
        </div>
      </section>

      {/* Right Column - Form Inputs */}
      <section className="col-span-2 flex h-full flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            type="text"
            className="focus:border-primary-red focus:ring-primary-red w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none focus:ring-1"
            placeholder="Name*"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            type="tel"
            pattern="(\d{10}|\+[0-9]{1,13}|\+[0-9]{1,3} [0-9]{10})"
            className="focus:border-primary-red focus:ring-primary-red w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none focus:ring-1"
            placeholder="Phone*"
          />
        </div>

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          type="email"
          className="focus:border-primary-red focus:ring-primary-red w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none focus:ring-1"
          placeholder="Email*"
        />
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          type="text"
          className="focus:border-primary-red focus:ring-primary-red w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none focus:ring-1"
          placeholder="Subject*"
        />

        <div className="flex flex-1 flex-col gap-2">
          <label className="text-base font-bold text-gray-800 lg:text-lg">
            How can we help?<span className="text-primary-red">*</span>
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            className="focus:border-primary-red focus:ring-primary-red w-full flex-1 resize-none rounded-lg border border-gray-300 px-4 py-3 text-base outline-none focus:ring-1"
          ></textarea>
        </div>
      </section>

      {/* Submit Button spanning under the right column */}
      <div className="col-span-1 flex justify-end lg:col-span-2 lg:col-start-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary-red inline-flex h-12 items-center justify-center gap-2 rounded-full px-10 text-base font-bold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending...
            </span>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </form>
  );
}
