"use client";

import { createContext, useState } from "react";

export const AuthContext = createContext<any|null>(null);

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<any|null>(null);
    return (
        <AuthContext value = {{user, setUser}}>
            {children}
        </AuthContext>
    )
}