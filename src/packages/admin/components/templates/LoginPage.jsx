'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

import { toast } from '@/components/ui/toast.jsx';
import { ImageContainer } from '@/components/molecules/ImageContainer.jsx';

import { getRuntimeConfig } from '../../lib/runtime.config.js';
import { Input } from '../atoms/Input.jsx';
import { Form } from '../molecules/Form.jsx';
import Image from 'next/image';

export function LoginPage({
  loginUrl = '/auth/login',
  redirectTo = '/admin/dashboard',
}) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(values) {
    setError(null);
    setLoading(true);

    try {
      const { apiBaseUrl } = getRuntimeConfig();
      const res = await fetch(`${apiBaseUrl}${loginUrl}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok || !data?.user) {
        setError(data?.errors?.[0]?.message ?? 'Invalid email or password');
        return;
      }
      router.push(redirectTo);
    } catch (err) {
      toast.add({
        type: 'error',
        description: err.message ?? 'Unable to login. Please try again.',
      });
      setLoading(false);
      return;
    }
  }

  return (
    <div className="bg-secondary-green/40 mx-auto flex h-screen flex-col-reverse items-center justify-center gap-0 px-4 md:flex-row">
      <div className="bg-primary-green/40 flex w-full flex-col justify-evenly rounded-lg border-none p-4 shadow-xl md:h-120 md:w-1/2 md:rounded-none md:rounded-l-lg lg:w-1/3 lg:p-8">
        <div className="flex items-center justify-center">
          <Image
            src="/images/logo.svg"
            alt="SSW logo"
            width={900}
            height={1600}
            className="aspect-square h-20 w-48"
          />
        </div>

        <div className="mb-6 flex flex-col items-center">
          <h1 className="text-primary-blue-dark text-3xl font-semibold">
            Welcome Back
          </h1>
          <p className="text-text-color text-center text-lg font-light">
            Login to your SSWCE-HR Admin Account
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <Input
            inputClassName="text-primary-blue text-lg!"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="off"
            required
          />

          <div className="relative flex items-center">
            <Input
              name="password"
              inputClassName="text-primary-blue text-lg! pr-10"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              autoComplete="off"
              required
              className="w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              title={showPassword ? 'Hide password' : 'Show password'}
              className="text-primary-blue/60 hover:text-primary-blue absolute right-3 bottom-3 flex size-5 cursor-pointer items-center justify-center"
            >
              {showPassword ? (
                <EyeOff className="text-primary-green-dark" size={24} />
              ) : (
                <Eye size={18} className="text-primary-green-dark" />
              )}
            </button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-green-dark w mt-2 cursor-pointer rounded-md px-4 py-2 text-lg font-normal text-white transition duration-500 ease-in-out disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </Form>
      </div>
      <div className="bg-card flex w-full flex-col items-center justify-center gap-4 rounded-r-lg border-l-0 p-2 shadow-xl md:h-120 md:w-1/2 md:items-start md:gap-6 lg:w-1/3">
        <ImageContainer
          src="/images/landing/hr.jpg"
          alt="SSW logo"
          className="aspect-square w-full object-top"
        />
      </div>
    </div>
  );
}
