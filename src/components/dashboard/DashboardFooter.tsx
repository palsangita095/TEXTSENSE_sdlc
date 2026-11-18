import Link from "next/link";

export default function DashboardFooter() {
  return (
    <footer>
      <div className="container mx-auto">
        <div className="pb-4 pt-3 text-center text-xs text-slate-400 sm:text-left">
          © 2026{" "}
          <Link href="/" className="hover:text-indigo-600">
            TEXTSENSE Analytics Inc.
          </Link>{" "}
          All rights reserved.
          <span className="mt-2 inline-flex items-center sm:ml-4 sm:mt-0">
            <i
              className="fa-solid fa-shield-halved mr-2 text-emerald-500"
              aria-hidden="true"></i>
            Your feedback data stays protected.
          </span>
        </div>
      </div>
    </footer>
  );
}
