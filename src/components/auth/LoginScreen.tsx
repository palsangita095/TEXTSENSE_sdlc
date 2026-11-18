"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSeletor } from "@/services/helpers/redux";
import { clearAuthError, loginUser } from "@/store/slices/auth.slice";
import { LoginFormValues } from "@/type/type/auth.type";
import LoginForm from "./LoginForm";
import LoginPreview from "./LoginPreview";

type FormMessage = {
  text: string;
  type: "success" | "error";
};


const   LoginScreen = () => {
  const { isLoading } = useAppSeletor((state) => state.auth);
  const [formMessage, setFormMessage] = useState<FormMessage | null>(null);

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const handleSignIn = async (data: LoginFormValues) => {
    
    if (isLoading) return;

    setFormMessage(null);

    try {
      const response = await dispatch(loginUser(data)).unwrap();

      const successMessage = response.message || "Login successful!";
      toast.success(successMessage);
      setFormMessage({ text: successMessage, type: "success" });

      const role = response.user?.role;
      const isAdmin = role === "SUPER_USER" || role === "REACT_ADMIN";

      router.push(isAdmin ? "/admin/dashboard" : "/dashboard");
    } catch (error) {
      const message =
        typeof error === "string" && error.trim()
          ? error
          : "Login failed. Please try again.";

      setFormMessage({ text: message, type: "error" });
      toast.error(message);
    }
  };

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
        <main className="relative overflow-hidden rounded-b-3xl bg-gradient-to-br from-[#91a9e9] via-[#DCE1F1] to-white">
          <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl"></div>

          <div className="pointer-events-none absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"></div>

          <div className="container relative mx-auto flex w-full max-w-[1600px] flex-col items-center justify-start px-5 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:justify-center lg:px-10 lg:py-8 xl:px-14">
            <div className="pointer-events-none absolute bottom-10 left-1/2 top-10 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-indigo-300/60 to-transparent lg:block"></div>

            {/* LEFT: LOGIN FORM */}
            <section className="w-full lg:w-1/2 lg:pr-10 xl:pr-14">
              <LoginForm
                isLoading={isLoading}
                formMessage={formMessage}
                onSubmit={handleSignIn}
              />
            </section>

            {/* RIGHT: PRODUCT PREVIEW */}
            <LoginPreview />
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginScreen;
