'use client'

import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/ui/Modal";
import { useState } from "react";
import { changeBanStatus } from "../../_action/UserShowCase/changeBanStatus";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  profilePicture?: string | null;
  createdAt: string;
  banned: boolean;
}

interface UserCardProps {
  user: User;
}

const roleBadge: Record<string, string> = {
  ADMIN: "bg-black text-white",
  SELLER: "bg-black/10 text-black",
  CUSTOMER: "bg-black/5 text-black/70",
};

export default function UserCard({ user }: UserCardProps) {
  const [isBanned, setIsBanned] = useState(user.banned);

  const handleBanToggle = async (userId: string) => {
    setIsBanned(!isBanned);
    await changeBanStatus(userId)
    // Here you can add API call to ban/unban the user
    toast.success(`${user.name} is now ${!isBanned ? "Banned" : "Active"}`);
  };

  return (
    <div className="shadow-xl flex rounded-2xl border border-black/10 hover:bg-black/2 transition-colors duration-150 p-5 items-center flex-col md:flex-row gap-4">

      {/* Avatar - exact match to table design */}
      <div className="w-10 h-10 overflow-hidden flex items-center justify-center text-sm font-black">
        {user.profilePicture ? (
          <img src={user.profilePicture} alt={user.name[0].toUpperCase()} className="w-full h-full rounded-full object-cover" />
        ) : (
          <span className="font-serif">{user.name.charAt(0).toUpperCase()}</span>
        )}
      </div>

      {/* User Info - exact styling from table columns */}
      <div className="flex-1 min-w-0 space-y-1 ">
        <p className="text-base font-bold text-black font-serif">{user.name}</p>
        <p className="text-sm font-mono text-black/70 truncate">{user.email}</p>
        <div className="flex items-center gap-2 flex-wrap mt-1">
          {/* Role badge - exact class match to table (no rounded) */}
          <span
            className={`text-sm font-mono uppercase tracking-widest px-3 py-1 font-semibold ${roleBadge[user.role] ?? "bg-black/5 text-black/70"}`}
          >
            {user.role}
          </span>
          {/* Joined - exact class match to table */}
          <span className="text-sm font-mono text-black/70">
            Joined: {new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
          </span>
        </div>
      </div>

      {/* Status & Actions - exact status badge match to table (no rounded) */}
      <div className="flex items-center gap-2 mt-2 md:mt-0 ">
        <span
          className={`text-sm font-mono uppercase tracking-widest px-3 py-1 font-semibold ${
            isBanned ? "bg-black text-white" : "bg-black/5 text-black/70"
          }`}
        >
          {isBanned ? "Banned" : "Active"}
        </span>

        <ConfirmModal
          trigger={
            <Button
              className="text-sm font-mono uppercase tracking-widest px-4 py-2 font-semibold border ">
                {isBanned ? "Unban User" : "Ban User"}
            </Button>
          } 
          description={`Are you sure you want to ${isBanned?"unban":"ban"} ${user.name}?`}
          onConfirm={() => handleBanToggle(user.id)}>
        </ConfirmModal>
      </div>
    </div>
  );
}