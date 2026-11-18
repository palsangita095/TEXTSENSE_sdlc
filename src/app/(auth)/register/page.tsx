"use client";

import { useState } from "react";
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { registerSchema } from "@/services/validations/auth.validation";
import Link from "next/link";

import { RegisterFormValues } from "@/type/type/auth.type";

import { useAppDispatch, useAppSeletor } from "@/services/helpers/redux";
import { registerUser } from "@/store/slices/auth.slice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import profile1 from "@/assets/images/auth/profile-1.jpg";
import profile2 from "@/assets/images/auth/profile-2.jpg";
import profile3 from "@/assets/images/auth/profile-3.jpg";

export default function Register() {



  const { isLoading } = useAppSeletor((state) => state.auth);

  const [formMessage, setFormMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const dispatch = useAppDispatch();
  const router = useRouter();

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setFormMessage(null);
    try {
      const response = await dispatch(registerUser(data)).unwrap();
      if (response.status === false) {
        throw response.message || "Registration failed. Please try again.";
      }

      const successMessage = response.message || "Registration successful!";
      toast.success(successMessage);
      setFormMessage({ text: successMessage, type: "success" });
      router.push("/login");
    } catch (error) {
      setFormMessage({
        text:
          typeof error === "string"
            ? error
            : "Registration failed. Please try again.",
        type: "error",
      });
      
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#849EE0] via-[#EDF1FC] to-white text-slate-800">
        <div className="flex min-h-screen flex-col p-4 sm:p-6 lg:p-8">
          {/* HEADER */}
          <header className="mx-auto w-full max-w-6xl rounded-t-3xl border border-white/70 bg-white px-6 py-5 sm:px-10 lg:px-12">
            <Link
              href="/"
              className="inline-flex items-center text-xl font-extrabold tracking-wider text-slate-800"
            >
              <span className="mr-2 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-md shadow-indigo-200">
                <i className="fa-solid fa-comments text-sm"></i>
              </span>
              TEXT<span className="text-blue-600">SENSE</span>
            </Link>
          </header>

          {/* MAIN */}
          <main className="mx-auto w-full max-w-6xl flex-1 overflow-hidden rounded-b-3xl border-x border-b border-white/70 bg-white shadow-2xl shadow-blue-900/10">
            <div className="flex flex-col lg:flex-row">
              {/* REGISTRATION SECTION */}
              <section className="w-full px-6 py-8 sm:px-10 lg:w-1/2 lg:px-12 lg:py-10">
                <div className="mb-7">
                  <span className="mb-3 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1.5 text-[11px] font-semibold text-indigo-700">
                    <i className="fa-solid fa-user-plus mr-2"></i>
                    GET STARTED FOR FREE
                  </span>

                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    Create account
                  </h1>

                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                    Enter your details to access your feedback intelligence
                    dashboard.
                  </p>
                </div>

                {/* REGISTRATION FORM */}
                <form
                  className="space-y-4"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                    >
                      Full Name
                    </label>

                    <div className="relative">
                      <i className="fa-regular fa-user absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>

                      <input
                        type="text"
                        id="name"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        {...register("name")}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                      />
                    </div>

                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.name?.message}
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>

                      <input
                        type="email"
                        id="email"
                        placeholder="you@company.com"
                        autoComplete="email"
                        {...register("email")}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                      />
                    </div>

                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.email?.message}
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                    >
                      Phone Number
                    </label>

                    <div className="relative">
                      <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>

                      <input
                        type="tel"
                        id="phone"
                        placeholder="10-digit mobile number"
                        inputMode="numeric"
                        maxLength={10}
                        autoComplete="tel"
                        {...register("phone")}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                      />
                    </div>

                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.phone?.message}
                    </p>
                  </div>

                  {/* Role */}
                  {/* <div>
                    <label
                      htmlFor="role"
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                    >
                      Role
                    </label>

                    <div className="relative">
                      <i className="fa-solid fa-briefcase absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>

                      <select
                        id="role"
                        {...register("role")}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm text-slate-600 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                      >
                        <option value="">Select your role</option>
                        <option value="REACT ADMIN">REACT ADMIN</option> */}
                        {/* <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="analyst">Analyst</option>
                        <option value="user">User</option> */}
                      {/* </select>

                      <i className="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400"></i>
                    </div>

                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.role?.message}
                    </p>
                  </div> */}

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>

                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Create a password"
                        autoComplete="new-password"
                        {...register("password")}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-indigo-600"
                        aria-label="Show password"
                      >
                        <i
                          className={
                            showPassword
                              ? "fa-regular fa-eye-slash"
                              : "fa-regular fa-eye"
                          }
                        ></i>
                      </button>
                    </div>

                    <p className="mt-1.5 text-[11px] text-slate-400">
                      Use at least 8 characters, including uppercase, lowercase,
                      number and special character.
                    </p>

                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.password?.message}
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                    >
                      Confirm Password
                    </label>

                    <div className="relative">
                      <i className="fa-solid fa-shield-halved absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>

                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                        {...register("confirm_password")}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-indigo-600"
                        aria-label="Show confirm password"
                      >
                        <i
                          className={
                            showConfirmPassword
                              ? "fa-regular fa-eye-slash"
                              : "fa-regular fa-eye"
                          }
                        ></i>
                      </button>
                    </div>

                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.confirm_password?.message}
                    </p>
                  </div>

                  {/* Terms */}
                  <div className="pt-1">
                    <label
                      htmlFor="terms"
                      className="flex cursor-pointer items-start"
                    >
                      <input
                        type="checkbox"
                        id="terms"
                        {...register("terms")}
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />

                      <span className="ml-2.5 text-xs leading-5 text-slate-500">
                        I agree to share the above details with TEXTSENSE and
                        accept the applicable terms and privacy policy.
                      </span>
                    </label>

                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.terms?.message}
                    </p>
                  </div>

                  {/* Form Message */}
                  {formMessage && (
                    <p
                      role="status"
                      aria-live="polite"
                      className={`rounded-lg px-3 py-2 text-sm ${formMessage.type === "success"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-600"
                        }`}
                    >
                      {formMessage.text}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Create Account

                    {isLoading ? (
                      <i className="fa-solid fa-spinner fa-spin ml-2"></i>
                    ) : (
                      <i className="fa-solid fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                    )}
                  </button>

                  {/* Login Link */}
                  <p className="pt-1 text-center text-xs text-slate-500">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      Sign in
                    </Link>
                  </p>
                </form>
              </section>

              {/* FEATURE PREVIEW */}
              <aside className="relative w-full overflow-hidden bg-gradient-to-br from-[#F1F5FF] via-[#F8FAFF] to-[#E5ECFF] px-6 py-8 sm:px-10 lg:w-1/2 lg:px-10 lg:py-12">
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl"></div>
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl"></div>

                <div className="relative">
                  <div className="mb-7">
                    <span className="mb-3 inline-flex items-center rounded-full border border-emerald-100 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></span>
                      Intelligence in real time
                    </span>

                    <h2 className="max-w-md text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                      Understand your customers.{" "}
                      <span className="text-indigo-600">
                        Make smarter decisions.
                      </span>
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                      Turn customer feedback into meaningful insights with
                      sentiment analysis and topic discovery.
                    </p>
                  </div>

                  {/* Analytics Card */}
                  <div className="rounded-2xl border border-white bg-white/90 p-5 shadow-xl shadow-indigo-900/5 sm:p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex min-w-0 items-center">
                        <span className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                          <i className="fa-solid fa-chart-line"></i>
                        </span>

                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-slate-800">
                            Sentiment Overview
                          </h3>
                          <p className="mt-1 text-[11px] text-slate-400">
                            Customer feedback insights
                          </p>
                        </div>
                      </div>

                      <span className="ml-2 shrink-0 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-700">
                        <i className="fa-solid fa-arrow-trend-up mr-1"></i>
                        +22%
                      </span>
                    </div>

                    {/* Metrics */}
                    <div className="mb-6 flex flex-wrap -mx-2">
                      <div className="w-1/2 px-2">
                        <div className="rounded-xl bg-indigo-50/80 p-3">
                          <p className="text-[11px] font-medium text-slate-500">
                            Positive Sentiment
                          </p>
                          <p className="mt-2 text-2xl font-extrabold text-indigo-700">
                            84%
                          </p>
                          <p className="mt-1 text-[10px] text-slate-400">
                            Overall score
                          </p>
                        </div>
                      </div>

                      <div className="w-1/2 px-2">
                        <div className="rounded-xl bg-emerald-50/80 p-3">
                          <p className="text-[11px] font-medium text-slate-500">
                            Analysed Messages
                          </p>
                          <p className="mt-2 text-2xl font-extrabold text-emerald-700">
                            24.8K
                          </p>
                          <p className="mt-1 text-[10px] text-slate-400">
                            Feedback signals
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sentiment Chart */}
                    <div className="mb-4">
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-700">
                          Customer Sentiment Trend
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          Last 7 weeks
                        </span>
                      </div>

                      <div
                        className="flex h-28 items-end justify-between border-b border-slate-100 px-1"
                        role="img"
                        aria-label="Illustrative customer sentiment trend over seven weeks"
                      >
                        <div className="h-[40%] w-[10%] rounded-t-md bg-blue-200"></div>
                        <div className="h-[55%] w-[10%] rounded-t-md bg-blue-300"></div>
                        <div className="h-[48%] w-[10%] rounded-t-md bg-blue-300"></div>
                        <div className="h-[70%] w-[10%] rounded-t-md bg-indigo-400"></div>
                        <div className="h-[65%] w-[10%] rounded-t-md bg-indigo-400"></div>
                        <div className="h-[85%] w-[10%] rounded-t-md bg-indigo-500"></div>
                        <div className="h-full w-[10%] rounded-t-md bg-indigo-600"></div>
                      </div>

                      <div className="mt-2 flex justify-between px-1 text-[9px] font-medium text-slate-400">
                        <span>W1</span>
                        <span>W2</span>
                        <span>W3</span>
                        <span>W4</span>
                        <span>W5</span>
                        <span>W6</span>
                        <span>W7</span>
                      </div>
                    </div>

                    {/* Insights */}
                    <div className="border-t border-slate-100 pt-4">
                      <div className="mb-3 flex items-start">
                        <span className="mr-3 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                          <i className="fa-solid fa-check text-xs"></i>
                        </span>

                        <div>
                          <p className="text-xs font-semibold text-slate-700">
                            Automated feedback categorization
                          </p>
                          <p className="mt-1 text-[11px] leading-5 text-slate-400">
                            Identify recurring topics and customer needs.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <span className="mr-3 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <i className="fa-solid fa-bolt text-xs"></i>
                        </span>

                        <div>
                          <p className="text-xs font-semibold text-slate-700">
                            Actionable customer insights
                          </p>
                          <p className="mt-1 text-[11px] leading-5 text-slate-400">
                            Spot trends and prioritize improvements.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Proof */}
                  <div className="mt-7">
                    <h3 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                      Master your customer intelligence
                    </h3>

                    <p className="max-w-md pt-2 text-xs leading-6 text-slate-500">
                      Transform customer words into clearer insights and better
                      product decisions.
                    </p>

                    <div className="mt-5 flex flex-wrap items-center">
                      <div className="mr-3 flex shrink-0 -space-x-2">
                        <Image
                          className="h-8 w-8 rounded-full border-2 border-white object-cover"
                          src={profile1}
                          alt="Customer profile 1"
                          loading="lazy"
                        />
                        <Image
                          className="h-8 w-8 rounded-full border-2 border-white object-cover"
                          src={profile2}
                          alt="Customer profile 2"
                          loading="lazy"
                        />
                        <Image
                          className="h-8 w-8 rounded-full border-2 border-white object-cover"
                          src={profile3}
                          alt="Customer profile 3"
                          loading="lazy"
                        />
                        
                      </div>

                      <div className="mt-2 sm:mt-0">
                        <div
                          className="mb-1 flex text-xs text-amber-400"
                          aria-label="Five star rating"
                        >
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>

                        <p className="text-[10px] font-medium text-slate-500">
                          Built for teams that listen to customers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </main>

          {/* FOOTER */}
          <footer className="mx-auto w-full max-w-6xl border-t border-slate-100 px-6 py-4 text-center text-[10px] text-slate-400 sm:px-10 sm:text-left lg:px-12">
            <div className="flex flex-col items-center justify-between sm:flex-row">
              <p>
                © 2026{" "}
                <Link
                  href="/"
                  className="font-semibold text-slate-600 transition hover:text-indigo-600"
                >
                  TEXTSENSE.
                </Link>{" "}
                All rights reserved.
              </p>

              <p className="mt-2 flex items-center sm:mt-0">
                <i className="fa-solid fa-shield-halved mr-2 text-emerald-500"></i>
                Your information deserves to stay protected.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
