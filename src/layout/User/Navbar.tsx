"use client";

import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  return (
    <header>
      <div className="w-full border-b border-transparent [border-image:linear-gradient(to_right,#4F46E5,#666BEF,#818CF8)_1]">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-5">
            <div className="flex w-full items-center justify-between lg:w-auto">
              <div className="shrink-0">
                <a href="#" className="flex items-center">
                  <Image
                    src="/assets/images/home_page/logo.png"
                    alt="TEXTSENSE Logo"
                    width={143}
                    height={54}
                    className="block w-auto h-auto"
                  />
                </a>
              </div>

              <div
                className="lg:hidden text-3xl cursor-pointer"
                id="menuBtn"
                onClick={() => setMobileOpen((currentValue) => !currentValue)}
              >
                <i className="fa-solid fa-bars"></i>
              </div>
            </div>
            <div>
              <ul
                id="navMenu"
                className={
                  mobileOpen
                    ? "flex flex-col absolute top-20 left-0 w-full bg-blue-50 p-5 z-50 items-center lg:static lg:flex-row lg:bg-transparent lg:p-0"
                    : "hidden lg:flex items-center"
                }
              >
                {navLinks.map((link) => (
                  <li key={link.label} className="ml-6 xl:ml-8">
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-[#475569] font-semibold font-inter hover:text-blue-600"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden lg:flex items-center shrink-0">
              <a
                href="/login"
                className="mr-7 text-sm text-[#475569] font-inter font-semibold hover:text-blue-600"
              >
                Sign in
              </a>

              <a
                href="#analyze"
                className="inline-flex items-center rounded-xl bg-[#4338CABF] px-5 py-3 text-sm font-inter font-semibold text-white shadow-lg hover:bg-blue-700 whitespace-nowrap"
              >
                Analyze Feedback
                <i className="fa-solid fa-arrow-right ml-2"></i>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
