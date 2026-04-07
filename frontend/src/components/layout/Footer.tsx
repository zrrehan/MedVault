import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────
interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

// ── Data ───────────────────────────────────────────────────────────────────
const COLUMNS: FooterColumn[] = [
  {
    heading: "Shop",
    links: [
      { label: "All Medicines", href: "/shop" },
      { label: "Categories", href: "/categories" },
      { label: "Featured Products", href: "/shop?featured=true" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Sign In", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "My Orders", href: "/orders" },
      { label: "My Profile", href: "/profile" },
    ],
  },
  {
    heading: "Sellers",
    links: [
      { label: "Sell on MediVault", href: "/register?role=seller" },
      { label: "Seller Dashboard", href: "/seller/dashboard" },
      { label: "Manage Inventory", href: "/seller/medicines" },
      { label: "View Orders", href: "/seller/orders" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

// ── Cross Icon ─────────────────────────────────────────────────────────────
const CrossIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 2H15V9H22V15H15V22H9V15H2V9H9V2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Footer Component ───────────────────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-black/10">

      {/* ── Main Footer Body ── */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">

          {/* Brand Column */}
          <div className="md:col-span-1 flex flex-col gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                <CrossIcon className="w-4 h-4 text-white" />
              </div>
              <span
                className="text-xl font-black text-black"
                style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}
              >
                MediVault
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-sm text-black/45 leading-relaxed">
              Your trusted online medicine shop. Genuine OTC products from verified pharmacies across Bangladesh.
            </p>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 w-fit border border-black/10 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              <span className="text-xs font-semibold text-black/50">OTC Only — No Rx Required</span>
            </div>
          </div>

          {/* Link Columns */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <p className="text-xs font-black tracking-[0.15em] uppercase text-black/30">
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-black/55 hover:text-black transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-black/10" />

      {/* ── Bottom Bar ── */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-black/35 text-center sm:text-left">
          &copy; {currentYear} MediVault. All rights reserved. Built for Bangladesh.
        </p>

        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-xs text-black/35 hover:text-black transition-colors duration-200">
            Privacy
          </Link>
          <Link href="/terms" className="text-xs text-black/35 hover:text-black transition-colors duration-200">
            Terms
          </Link>
          <Link href="/contact" className="text-xs text-black/35 hover:text-black transition-colors duration-200">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}