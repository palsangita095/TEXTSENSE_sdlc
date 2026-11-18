import Image from "next/image";

const productLinks = [
  { label: "Sentiment analysis", href: "#sentiment-analysis" },
  { label: "Keyword insights", href: "#keyword-insights" },
  { label: "Analytics dashboard", href: "#analytics-dashboard" },
  { label: "Reports & exports", href: "#reports" },
  { label: "Pricing", href: "#pricing" },
];

const platformLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "User dashboard", href: "#dashboard" },
  { label: "Admin console", href: "#admin" },
  { label: "Keyword analytics", href: "#keyword-analytics" },
  { label: "Integrations", href: "#integrations" },
];

const resourceLinks = [
  { label: "Articles", href: "#resources" },
  { label: "Documentation", href: "#documentation" },
  { label: "Case studies", href: "#case-studies" },
  { label: "FAQ", href: "#faq" },
  { label: "Changelog", href: "#changelog" },
];

const companyLinks = [
  { label: "About", href: "#about" },
  { label: "Careers", href: "#careers" },
  { label: "Security", href: "#security" },
  { label: "Privacy", href: "#privacy" },
  { label: "Contact sales", href: "#contact-sales" },
];

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) => (
  <div className="w-1/2 sm:w-1/3 lg:w-2/12 px-4 mb-9 lg:mb-0">
    <p className="text-sm font-bold text-white mb-5">{title}</p>
    <div>
      <ul className="space-y-4 text-sm text-slate-400">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="hover:text-cyan-300 transition">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#07152F] text-white border-t-2 border-cyan-400">
      <div className="container mx-auto px-5 lg:px-8">
        <div className="flex flex-wrap -mx-4 py-12 lg:py-14">
          <div className="w-full lg:w-4/12 px-4 mb-10 lg:mb-0">
            {/* Logo */}
            <a
              href="#home"
              className="block w-[350px] sm:w-[400px] md:w-[450px] lg:w-[500px]"
            >
              <Image
                src="/assets/images/home_page/footer-logo.png"
                alt="footer-logo"
                width={396}
                height={58}
                className="w-full h-auto object-contain"
              />
            </a>

            {/* Tagline */}
            <p className="text-sm font-semibold text-slate-300 mb-3">
              Listen. Understand. Improve.
            </p>

            {/* Description */}
            <p className="max-w-md text-sm leading-7 text-slate-400 mb-6">
              AI-powered customer feedback and text analytics for teams who want
              to act on what their customers actually say.
            </p>

            {/* Social Icons */}
            <div className="flex items-center">
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-white text-slate-800 mr-3 hover:bg-blue-500 hover:text-white transition duration-300"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>

              <a
                href="mailto:support@textsense.com"
                aria-label="Email"
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-white text-slate-800 mr-3 hover:bg-blue-500 hover:text-white transition duration-300"
              >
                <i className="fa-regular fa-envelope"></i>
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-white text-slate-800 mr-3 hover:bg-blue-500 hover:text-white transition duration-300"
              >
                <i className="fa-brands fa-github"></i>
              </a>

              <a
                href="#"
                aria-label="Community"
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-white text-slate-800 hover:bg-blue-500 hover:text-white transition duration-300"
              >
                <i className="fa-solid fa-comments"></i>
              </a>
            </div>
          </div>

          {/* PRODUCT LINKS */}
          <FooterColumn title="Product" links={productLinks} />

          {/* PLATFORM LINKS */}
          <FooterColumn title="Platform" links={platformLinks} />

          {/* RESOURCES LINKS */}
          <FooterColumn title="Resources" links={resourceLinks} />

          {/* COMPANY LINKS */}
          <FooterColumn title="Company" links={companyLinks} />
        </div>

        {/* FOOTER BOTTOM BORDER */}
        <div className="border-t border-slate-600/70"></div>

        {/* COPYRIGHT AND STATUS */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between py-6">
          {/* Copyright */}
          <p className="text-xs sm:text-sm text-slate-400 mb-5 lg:mb-0">
            &copy; 2026 <a href="#">TEXTSENSE Analytics Inc.</a> All rights
            reserved.
          </p>

          {/* Security Status */}
          <div className="flex flex-wrap items-center text-xs text-slate-400">
            {/* SOC Status */}
            <span className="inline-flex items-center mr-5 mb-3 lg:mb-0">
              <i className="fa-solid fa-shield-halved text-emerald-400 mr-2"></i>
              SOC 2 Type I
            </span>

            {/* GDPR Status */}
            <span className="inline-flex items-center mr-5 mb-3 lg:mb-0">
              <i className="fa-solid fa-lock text-emerald-400 mr-2"></i>
              GDPR compliant
            </span>

            {/* System Status */}
            <span className="inline-flex items-center mb-3 lg:mb-0">
              <span className="relative flex w-2 h-2 mr-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping"></span>
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400"></span>
              </span>

              Status:

              <span className="text-emerald-400 ml-1">
                All systems operational
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
