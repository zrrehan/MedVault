'use client';
import { getUserDetails } from "@/utils/getUserDetails";
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ConfirmModal from "@/components/ui/Modal";
import { updateUserData } from "../_action/updateUserData";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/utils/AuthContext";

function MyProfile() {
    const [userData, setUserData] = useState<any | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [name, setName] = useState<any | null>(null);
    const [imageUrl, setImageUrl] = useState<any | null>(null);
    const router = useRouter();
    const { setUser } = useContext(AuthContext);

    useEffect(() => {
        async function getUser() {
            const userDetails = await getUserDetails();
            setUserData(userDetails);
            setName(userDetails?.name);
            setImageUrl(userDetails?.profilePicture);
            setTimeout(() => setIsLoaded(true), 80);
        }
        getUser();
    }, []);

    const formattedDate = userData?.createdAt
        ? new Date(userData.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        : "—";

    const initials = userData?.name
        ?.split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    // Properly typed animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.15,
            },
        },
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 40, scale: 0.96 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 65,
                damping: 22,
                duration: 0.75,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const
            },
        },
    };

    const avatarVariants: Variants = {
        hidden: { scale: 0.65, opacity: 0, rotate: -10 },
        visible: {
            scale: 1,
            opacity: 1,
            rotate: 0,
            transition: {
                type: "spring" as const,
                stiffness: 130,
                damping: 15,
                delay: 0.25,
            },
        },
    };

    const handleUpdate = async () => {
        if(name == "" || imageUrl == "") {
            toast.warning("Fill Name and ImageUrl Both!");
            return;
        }
        const result = await updateUserData(name, imageUrl)
        if(result.success) {
            toast.success(`${result.message}, Please Login Again`);
            setUser(null);
            router.push("/login")
        } else {
            toast.error("Something Went Wrong");
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16 relative overflow-hidden">
            {/* Subtle Grid Background */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)
          `,
                    backgroundSize: "50px 50px",
                }}
            />

            {/* Corner Dots with staggered animation */}
            {["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"].map((pos, i) => (
                <motion.span
                    key={pos}
                    className={`pointer-events-none absolute ${pos} w-1 h-1 rounded-full bg-black/25`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.12 }}
                />
            ))}

            <div className="relative w-full max-w-xl z-10">
                {/* Breadcrumb */}
                <motion.p
                    className="text-[12px] font-semibold tracking-[0.2em] uppercase mb-8"
                    style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'DM Mono', monospace" }}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    Dashboard <span style={{ color: "rgba(0,0,0,0.6)" }}>/ My Profile</span>
                </motion.p>

                {/* Main Profile Card */}
                <AnimatePresence mode="wait">
                    {isLoaded && (
                        <motion.div
                            className="relative rounded-[6px] overflow-hidden"
                            style={{
                                background: "#ffffff",
                                border: "1px solid rgba(0,0,0,0.1)",
                                boxShadow:
                                    "0 1px 2px rgba(0,0,0,0.04), 0 10px 30px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.85)",
                            }}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        >
                            {/* Top Black Bar */}
                            <motion.div
                                className="h-[3px] w-full bg-black"
                                initial={{ scaleX: 0, originX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                            />

                            <div className="p-10">
                                {/* Avatar + Name Section */}
                                <motion.div
                                    className="flex items-start gap-7 mb-9"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.div className="relative flex-shrink-0" variants={avatarVariants}>
                                        <div
                                            className="w-[96px] h-[96px] rounded-[6px] overflow-hidden"
                                            style={{
                                                border: "1px solid rgba(0,0,0,0.12)",
                                                boxShadow: "0 0 0 5px rgba(0,0,0,0.04)",
                                            }}
                                        >
                                            {userData?.profilePicture ? (
                                                <img
                                                    src={userData.profilePicture}
                                                    alt={userData.name}
                                                    className="object-cover w-full h-full"
                                                />
                                            ) : (
                                                <div
                                                    className="w-full h-full flex items-center justify-center text-white text-2xl font-black tracking-tighter"
                                                    style={{
                                                        background: "#000000",
                                                        fontFamily: "'Georgia', serif",
                                                    }}
                                                >
                                                    {initials || "??"}
                                                </div>
                                            )}
                                        </div>

                                        {/* Pulsing Online Dot */}
                                        <motion.div
                                            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-[2.5px] border-white"
                                            style={{ backgroundColor: "#16a34a" }}
                                            animate={{ scale: [1, 1.18, 1] }}
                                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                    </motion.div>

                                    {/* Name & Role */}
                                    <motion.div className="pt-1" variants={itemVariants}>
                                        <motion.h1
                                            className="text-[1.85rem] font-black text-black leading-none tracking-[-0.04em] mb-3"
                                            style={{ fontFamily: "'Georgia', serif" }}
                                        >
                                            {userData?.name || "Loading..."}
                                        </motion.h1>

                                        <motion.div
                                            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase px-4 py-1.5 rounded-full"
                                            style={{
                                                background: "rgba(0,0,0,0.06)",
                                                color: "rgba(0,0,0,0.8)",
                                                border: "1px solid rgba(0,0,0,0.1)",
                                                fontFamily: "'DM Mono', monospace",
                                            }}
                                            variants={itemVariants}
                                        >
                                            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                                            {userData?.role || "—"}
                                        </motion.div>
                                    </motion.div>
                                </motion.div>

                                {/* Divider */}
                                <motion.div
                                    className="h-px w-full mb-8"
                                    style={{ background: "rgba(0,0,0,0.07)" }}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.45 }}
                                />

                                {/* Information Grid */}
                                <motion.div
                                    className="grid grid-cols-2 gap-x-8 gap-y-7"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {[
                                        { label: "Email Address", value: userData?.email },
                                        {
                                            label: "Account Role",
                                            value: userData?.role
                                                ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1).toLowerCase()
                                                : "—"
                                        },
                                        { label: "Member Since", value: formattedDate },
                                        { label: "Status", value: "Active" },
                                    ].map(({ label, value }, i) => (
                                        <motion.div
                                            key={label}
                                            variants={itemVariants}
                                            whileHover={{ y: -3, transition: { duration: 0.2 } }}
                                        >
                                            <p
                                                className="text-[11px] font-bold tracking-[0.2em] uppercase mb-1.5"
                                                style={{ color: "rgba(0,0,0,0.42)", fontFamily: "'DM Mono', monospace" }}
                                            >
                                                {label}
                                            </p>
                                            <p className="text-[15px] font-medium text-black/90">
                                                {value ?? "—"}
                                            </p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Footer */}
                            <motion.div
                                className="px-10 py-6 flex items-center justify-between border-t"
                                style={{ borderColor: "rgba(0,0,0,0.07)" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.75 }}
                            >
                                <p
                                    className="text-sm"
                                    style={{ color: "rgba(0,0,0,0.45)", fontFamily: "'DM Mono', monospace" }}
                                >
                                    Joined · {formattedDate}
                                </p>

                                <ConfirmModal
                                    trigger={
                                        <motion.button
                                            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-full"
                                            style={{
                                                background: "#000000",
                                                color: "#fff",
                                                fontFamily: "'DM Mono', monospace",
                                            }}
                                            whileHover={{ scale: 1.04, backgroundColor: "#1a1a1a" }}
                                            whileTap={{ scale: 0.96 }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-4 h-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={3}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                            Edit Profile
                                        </motion.button>
                                    }
                                    onConfirm={handleUpdate}
                                >
                                    <div className="space-y-6">
                                        {/* Name Field */}
                                        <div className="space-y-2">
                                            <label
                                                className="text-[11px] font-bold tracking-[0.2em] uppercase"
                                                style={{
                                                    color: "rgba(0,0,0,0.45)",
                                                    fontFamily: "'DM Mono', monospace",
                                                }}
                                            >
                                                Full Name
                                            </label>

                                            <input
                                                required
                                                type="text"
                                                placeholder="Enter your name"
                                                defaultValue={name}
                                                onChange={(event) => setName(event.target.value)}
                                                className="w-full px-4 py-3 rounded-[6px] text-sm outline-none transition-all"
                                                style={{
                                                    background: "#ffffff",
                                                    border: "1px solid rgba(0,0,0,0.12)",
                                                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
                                                }}
                                                onFocus={(e) =>
                                                    (e.currentTarget.style.border = "1px solid rgba(0,0,0,0.35)")
                                                }
                                                onBlur={(e) =>
                                                    (e.currentTarget.style.border = "1px solid rgba(0,0,0,0.12)")
                                                }
                                            />
                                        </div>

                                        {/* Image URL Field */}
                                        <div className="space-y-2">
                                            <label
                                                className="text-[11px] font-bold tracking-[0.2em] uppercase"
                                                style={{
                                                    color: "rgba(0,0,0,0.45)",
                                                    fontFamily: "'DM Mono', monospace",
                                                }}
                                            >
                                                Profile Image URL
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="https://example.com/image.jpg"
                                                onChange={(event) => setImageUrl(event.target.value)}
                                                defaultValue={imageUrl}
                                                className="w-full px-4 py-3 rounded-[6px] text-sm outline-none transition-all"
                                                style={{
                                                    background: "#ffffff",
                                                    border: "1px solid rgba(0,0,0,0.12)",
                                                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
                                                }}
                                                onFocus={(e) =>
                                                    (e.currentTarget.style.border = "1px solid rgba(0,0,0,0.35)")
                                                }
                                                onBlur={(e) =>
                                                    (e.currentTarget.style.border = "1px solid rgba(0,0,0,0.12)")
                                                }
                                            />
                                        </div>

                                        {/* Subtle helper text */}
                                        <p
                                            className="text-[11px] leading-relaxed"
                                            style={{
                                                color: "rgba(0,0,0,0.35)",
                                                fontFamily: "'DM Mono', monospace",
                                            }}
                                        >
                                            Ensure the image URL is publicly accessible. Changes will reflect instantly after confirmation.
                                        </p>
                                    </div>
                                </ConfirmModal>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bottom Security Label */}
                <motion.p
                    className="text-center text-[10px] tracking-[0.25em] uppercase mt-8"
                    style={{ color: "rgba(0,0,0,0.18)", fontFamily: "'DM Mono', monospace" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                >
                    Secured • Encrypted • Verified
                </motion.p>
            </div>
        </div>
    );
}

export default MyProfile;