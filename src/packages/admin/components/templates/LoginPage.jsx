"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { toast } from "@/components/ui/toast.jsx";
import { ImageContainer } from "@/components/molecules/ImageContainer.jsx";

import { getRuntimeConfig } from "../../lib/runtime.config.js";
import { Input } from "../atoms/Input.jsx";
import { Form } from "../molecules/Form.jsx";

export function LoginPage({ loginUrl = "/auth/login", redirectTo = "/admin/dashboard" }) {
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
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok || !data?.user) {
        setError(data?.errors?.[0]?.message ?? "Invalid email or password");
        return;
      }
      router.push(redirectTo);
    } catch (err) {
      toast.add({
        type: "error",
        description: err.message ?? "Unable to login. Please try again.",
      });
      setLoading(false);
      return;
    }
  }

  return (
    <div className="container mx-auto flex h-screen flex-col-reverse items-center justify-center gap-0 px-4 md:flex-row">
      <div className="bg-primary-green/70 flex w-full flex-col justify-evenly rounded-lg border-none p-4 md:h-110 md:w-1/2 md:rounded-none md:rounded-l-lg lg:w-1/3 lg:p-8">
        <div className="mb-6 flex flex-col items-center">
          <h1 className="text-primary-blue-dark text-3xl font-semibold">Welcome Back</h1>
          <p className="text-text-color text-center text-lg font-light">
            Login to your SSW Admin Account
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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="off"
              required
              className="w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              title={showPassword ? "Hide password" : "Show password"}
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </Form>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-r-lg border-l-0 p-2 shadow-xl md:h-110 md:w-1/2 md:items-start md:gap-6 md:border lg:w-1/3">
        <ImageContainer src="/ssw.png" alt="SSW logo" className="aspect-video w-full" />
      </div>
    </div>
  );
}
