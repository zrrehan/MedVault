"use client";
import Link from "next/link";
import { updatePaymentAction } from "../_action/updatePayment";
import { useEffect } from "react";

export default function SuccessPaid({orderId}: any) {
    useEffect(() => {
        async function updatePayment() {
            await updatePaymentAction(orderId as string, localStorage.getItem("payment_id") || "");
        }
        updatePayment();
    })

    return (
        <div className="relative min-h-svh flex items-center justify-center px-6 bg-white overflow-hidden">

            {/* Grid */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative z-10 text-center max-w-md">

                {/* Status */}
                <p className="text-xs tracking-[0.3em] uppercase text-black/30 mb-4">
                    Payment Status
                </p>

                {/* Heading */}
                <h1
                    className="text-4xl md:text-5xl font-black text-black leading-tight"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    Payment Successful.
                </h1>

                {/* Description */}
                <p className="mt-4 text-sm text-black/50 leading-relaxed">
                    Your order has been placed successfully. You can track it from your dashboard.
                </p>

                {/* Subtle divider */}
                <div className="w-12 h-[2px] bg-black/10 mx-auto my-6" />

                {/* CTA */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-black text-white text-sm font-bold hover:opacity-80 transition"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}