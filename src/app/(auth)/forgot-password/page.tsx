import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forgot Password | TEXTSENSE",
  description: "Reset your TEXTSENSE account password.",
};


export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <div className="container mx-auto w-full max-w-6xl px-4 pt-2 pb-4 sm:px-6 sm:pt-3 lg:px-8">
        {/* HEADER */}
        <header>
          <div className="w-full rounded-t-3xl border border-white/70 bg-gradient-to-b from-[#849EE0] via-[#EDF1FC] to-white px-5 py-4 sm:px-8 sm:py-5 lg:px-12">
            <div className="shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/assets/images/home_page/logo.png"
                  alt="TEXTSENSE Logo"
                  width={143}
                  height={54}
                  priority
                  className="block h-auto w-auto"
                />
              </Link>
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main className="relative overflow-hidden rounded-b-3xl bg-gradient-to-br from-[#91a9e9] via-[#DCE1F1] to-white px-5 py-12 sm:px-8 sm:py-16">
          <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"></div>

          <div className="relative mx-auto w-full max-w-[450px] rounded-[24px] border border-white/80 bg-white/70 p-6 shadow-[0_25px_70px_-25px_rgba(49,46,129,0.30)] backdrop-blur-xl sm:p-8">
            <span className="mb-4 inline-flex items-center rounded-full border border-indigo-200/70 bg-white/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-700 sm:text-xs">
              <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></span>
              Account recovery
            </span>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900">
              Forgot password?
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Password reset is not yet available for TEXTSENSE accounts. Please contact your
              administrator to reset your password, or sign in with your existing credentials.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="flex h-[52px] w-full items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-200/70 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-300/60 active:translate-y-0"
              >
                Back to Sign In
                <i className="fa-solid fa-arrow-right ml-3 text-xs"></i>
              </Link>
            </div>

            <div className="mt-7 flex items-center justify-center text-[10px] text-slate-500 sm:text-xs">
              <i className="fa-solid fa-shield-halved mr-2 text-emerald-600"></i>
              Your information is protected and secure.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

