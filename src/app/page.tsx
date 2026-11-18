import Articleresources from "@/components/Home-sections/Articleresources";
import Billing from "@/components/Home-sections/Billing";
import Capabilities from "@/components/Home-sections/Capabilities";
import Ctasection from "@/components/Home-sections/Ctasection";
import Customerstories from "@/components/Home-sections/Customerstories";
import Faq from "@/components/Home-sections/Faq";
import Homebanner from "@/components/Home-sections/Homebanner";
import Howitworks from "@/components/Home-sections/Howitworks";
import Teamsswitch from "@/components/Home-sections/Teamsswitch";
import Trustedcompanies from "@/components/Home-sections/Trustedcompanies";

import { Suspense } from "react";


export default function Home() {
  return (
    <>
      <Homebanner />
       <Suspense
        fallback={
          <div className="py-6 sm:py-8 border-y border-gray-200 bg-white" />
        }
      >
        <Trustedcompanies />
      </Suspense>
      <Capabilities />
      <Howitworks />
      <Teamsswitch />
      <Customerstories />
      <Billing />
      <Faq />
      <Articleresources />
      <Ctasection />
    </>
  );
}
