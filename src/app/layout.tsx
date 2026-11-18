import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ProviderLayout from "@/layout/wrapper";
import ReduxProvider from "@/services/helpers/provider/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const interFont = Inter({
  variable: "--font-inter-family",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TEXTSENSE",
  description: "Turn Customer Feedback Into Actionable Insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${interFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
       
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/all.min.css"
          integrity="sha512-ApSLB1Pd3/bZN8fWB/RG9YhN/7bd9Hkf3AGaE2mPfebjrxagjuBtx2GcgdqIlJkUzwylBo61r9Xa9NmgBI0swA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <ProviderLayout>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </ProviderLayout>
      </body>
    </html>
  );
}
