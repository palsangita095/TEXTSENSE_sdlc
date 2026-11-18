import type { Metadata } from "next";
import LoginScreen from "@/components/auth/LoginScreen";

export const metadata: Metadata = {
  title: "Login | TEXTSENSE",
  description: "Sign in to transform customer feedback into meaningful insights.",
};

export default function LoginPage() {
  return <LoginScreen />;
}
