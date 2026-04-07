"use client";

import { useState, useRef, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// ── Data ───────────────────────────────────────────────────────────────────
const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: "What types of medicines can I buy on MediVault?",
    answer:
      "MediVault exclusively carries over-the-counter (OTC) medicines — no prescription required. This includes pain relievers, antacids, vitamins, antiseptics, cough syrups, allergy tablets, and general wellness products from verified pharmacies across Bangladesh.",
  },
  {
    id: 2,
    question: "Are the medicines on MediVault genuine and safe?",
    answer:
      "Absolutely. Every seller on MediVault goes through a verification process before listing any product. We only allow licensed pharmacies and registered vendors. All medicines are sourced directly from authorized distributors and carry valid batch numbers and expiry dates.",
  },
  {
    id: 3,
    question: "How do I place an order?",
    answer:
      "Browse the shop, add your desired medicines to the cart, head to checkout, enter your delivery address, and confirm your order. We currently support Cash on Delivery (COD). You'll receive a confirmation and can track your order status in real time from your account dashboard.",
  },
  {
    id: 4,
    question: "Can I cancel or return an order?",
    answer:
      "You can cancel an order while it is in the 'Placed' status — before the seller begins processing it. Once an order moves to 'Processing', cancellation is no longer available. For returns due to damaged or incorrect items, please contact the seller directly through your order details page.",
  },
  {
    id: 5,
    question: "How do I register as a seller on MediVault?",
    answer:
      "Click 'Sell on MediVault' from the homepage and complete the seller registration form. Once your account is verified by our admin team, you can start listing medicines, managing stock, and fulfilling orders from your seller dashboard.",
  },
  {
    id: 6,
    question: "How long does delivery take?",
    answer:
      "Delivery times vary by seller location and your delivery address. Most orders within Dhaka are fulfilled within 1–2 business days. Deliveries to other districts typically take 3–5 business days. Estimated delivery time is shown at checkout before you confirm your order.",
  },
];

// ── Animated Accordion Item ────────────────────────────────────────────────
interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const AccordionItem = ({ item, isOpen, onToggle, index }: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`border-b border-black/10 transition-colors duration-300 ${
        isOpen ? "bg-black/[0.02]" : "bg-white hover:bg-black/[0.015]"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 px-8 py-6 text-left group"
        aria-expanded={isOpen}
      >
        {/* Index Number */}
        <span
          className="shrink-0 text-xs font-black text-black/20 mt-1 tabular-nums"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {String(index).padStart(2, "0")}
        </span>

        {/* Question */}
        <span
          className="flex-1 text-base md:text-lg font-bold text-black leading-snug group-hover:text-black/70 transition-colors duration-200"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {item.question}
        </span>

        {/* Toggle Icon */}
        <span className="shrink-0 mt-1 w-6 h-6 flex items-center justify-center">
          <svg
            className={`w-4 h-4 text-black transition-transform duration-400 ease-in-out ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>

      {/* Animated Answer */}
      <div
        style={{ height: `${height}px`, transition: "height 0.35s cubic-bezier(0.4,0,0.2,1)" }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="px-8 pb-6 pl-[4.5rem]">
          <p className="text-sm md:text-base text-black/55 leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Main FAQ Component ─────────────────────────────────────────────────────
export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);
  const [visible, setVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-triggered entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-24 px-6"
    >
      {/* Subtle grid texture — consistent with Hero */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* ── Section Header ── */}
        <div
          className={`mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Label */}
          <p className="text-xs font-black tracking-[0.2em] uppercase text-black/30 mb-4">
            FAQ
          </p>

          {/* Heading — split layout */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-4xl md:text-6xl font-black text-black leading-tight"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}
            >
              Questions <br />
              <span className="relative inline-block">
                Answered.
                <span
                  className="absolute left-0 w-full bg-black rounded"
                  style={{ bottom: "4px", height: "5px", opacity: 0.1 }}
                />
              </span>
            </h2>

            <p className="max-w-xs text-sm text-black/45 leading-relaxed md:text-right">
              Everything you need to know about ordering medicines on MediVault.
              Can&apos;t find an answer?{" "}
              <a href="/contact" className="underline underline-offset-2 text-black/70 hover:text-black transition-colors">
                Contact us.
              </a>
            </p>
          </div>
        </div>

        {/* ── Accordion ── */}
        <div
          className={`border-t border-black/10 rounded-2xl overflow-hidden shadow-[0_2px_40px_rgba(0,0,0,0.06)] transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
              index={i + 1}
            />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div
          className={`mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-6 border border-black/10 rounded-2xl transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <p className="text-sm text-black/50 text-center sm:text-left">
            Still have questions? Our support team is available 7 days a week.
          </p>
          <a
            href="/contact"
            className="shrink-0 text-sm font-bold bg-black text-white px-6 py-3 rounded-full hover:opacity-75 transition-opacity duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}