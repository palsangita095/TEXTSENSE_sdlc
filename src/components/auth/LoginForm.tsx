"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { loginSchema } from "@/services/validations/auth.validation";
import { LoginFormValues } from "@/type/type/auth.type";

type FormMessage = {
  text: string;
  type: "success" | "error";
};

type LoginFormProps = {
  isLoading: boolean;
  formMessage: FormMessage | null;
  onSubmit: (data: LoginFormValues) => void | Promise<void>;
};

const googleAuthUrl =
  process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL || "https://accounts.google.com/ServiceLogin";
const githubAuthUrl =
  process.env.NEXT_PUBLIC_GITHUB_AUTH_URL || "https://github.com/login";


const LoginForm = ({ isLoading, formMessage, onSubmit }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <div className="login-card mx-auto w-full max-w-[450px]">
      {/* HEADING */}
      <div className="mb-8">
        <span className="mb-4 inline-flex items-center rounded-full border border-indigo-200/70 bg-white/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-700 sm:text-xs">
          <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></span>
          Your insights start here
        </span>

        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          Welcome Back
        </h2>

        <p className="mt-3 max-w-[390px] text-sm leading-6 text-slate-600 sm:text-base">
          Sign in to transform customer feedback into meaningful insights.
        </p>
      </div>

      {/* LOGIN FORM */}
      <form id="loginForm" noValidate onSubmit={handleSubmit(onSubmit)}>
        {/* EMAIL */}
        <div className="mb-5">
          <label htmlFor="email" className="mb-2 block text-xs font-bold text-slate-700 sm:text-sm">
            Email Address
          </label>

          <div className="relative">
            <i className="fa-regular fa-envelope pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>

            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              autoComplete="email"
              aria-describedby="emailError"
              aria-invalid={errors.email_or_phone ? true : undefined}
              {...register("email_or_phone")}
              className="h-12 w-full rounded-xl border border-slate-300/80 bg-white/65 pl-11 pr-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-indigo-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <p
            id="emailError"
            className={`mt-1 text-xs text-red-600 ${errors?.email_or_phone ? "" : "hidden"}`}
            aria-live="polite"
          >
            {errors?.email_or_phone?.message}
          </p>
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label
            htmlFor="adminPassword"
            className="mb-2 block text-sm font-bold text-slate-800"
          >
            Password
          </label>

          <div className="relative">
            <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>

            <input
              type={showPassword ? "text" : "password"}
              id="adminPassword"
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-describedby="adminPasswordError"
              aria-invalid={errors.password ? true : undefined}
              {...register("password")}
              className="h-12 w-full rounded-xl border border-slate-300 bg-white/90 pl-11 pr-12 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              id="adminTogglePassword"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              <i
                id="adminPasswordIcon"
                className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}
              ></i>
            </button>
          </div>

          <p
            id="adminPasswordError"
            className={`mt-1 text-xs text-red-700 ${errors.password ? "" : "hidden"}`}
            aria-live="polite"
          >
            {errors.password?.message}
          </p>
        </div>

        {/* REMEMBER ME */}
        <div className="mb-6 flex flex-wrap items-center justify-between text-sm">
          <label
            htmlFor="adminRemember"
            className="mb-2 flex cursor-pointer items-center text-slate-700 sm:mb-0"
          >
            <input
              type="checkbox"
              id="adminRemember"
              name="remember"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="mr-2 h-4 w-4 accent-blue-700"
            />
            Remember Me
          </label>

          <Link
            href="/forgot-password"
            className="font-semibold text-blue-700 transition hover:text-blue-900"
          >
            Forgot Password?
          </Link>
        </div>

        {/* FORM MESSAGE */}
        {formMessage && (
          <p
            id="formMessage"
            role="status"
            aria-live="polite"
            className={`mb-4 rounded-xl px-4 py-3 text-sm ${
              formMessage.type === "success"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {formMessage.text}
          </p>
        )}

        {/* SIGN IN */}
        <button
          type="submit"
          disabled={isLoading}
          className="mb-6 flex h-[52px] w-full items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-200/70 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-300/60 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Sign In
          {isLoading ? (
            <i className="fa-solid fa-spinner fa-spin ml-3 text-xs"></i>
          ) : (
            <i className="fa-solid fa-arrow-right ml-3 text-xs"></i>
          )}
        </button>

        {/* DIVIDER */}
        <div className="mb-6 flex items-center">
          <span className="h-px flex-1 bg-slate-300/80"></span>

          <span className="whitespace-nowrap px-4 text-[10px] font-bold tracking-[0.15em] text-slate-400">
            OR CONTINUE WITH
          </span>

          <span className="h-px flex-1 bg-slate-300/80"></span>
        </div>

        {/* SOCIAL BUTTONS */}
        <div className="flex flex-col sm:flex-row">
          <div className="mb-3 w-full sm:mb-0 sm:w-1/2 sm:pr-2">
            <a
              href={googleAuthUrl}
              aria-label="Continue with Google"
              className="flex min-h-[48px] w-full items-center justify-center rounded-xl border border-slate-300 bg-white/40 px-4 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-white/80"
            >
              <i className="fa-brands fa-google mr-3 text-base text-red-500"></i>
              Google
            </a>
          </div>

          <div className="w-full sm:w-1/2 sm:pl-2">
            <a
              href={githubAuthUrl}
              aria-label="Continue with GitHub"
              className="flex min-h-[48px] w-full items-center justify-center rounded-xl border border-slate-300 bg-white/40 px-4 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-white/80"
            >
              <i className="fa-brands fa-github mr-3 text-base"></i>
              GitHub
            </a>
          </div>
        </div>
      </form>

      {/* CREATE ACCOUNT */}
      <div className="mt-7 text-center">
        <p className="text-xs text-slate-600 sm:text-sm">
          Don&apos;t have an account?
          <Link
            href="/register"
            className="ml-1 font-bold text-indigo-600 transition hover:text-indigo-800"
          >
            Create an account
          </Link>
        </p>
      </div>

      {/* SECURITY NOTE */}
      <div className="mt-7 flex items-center justify-center text-[10px] text-slate-500 sm:text-xs">
        <i className="fa-solid fa-shield-halved mr-2 text-emerald-600"></i>
        Your information is protected and secure.
      </div>
    </div>
  );
};

export default LoginForm;
