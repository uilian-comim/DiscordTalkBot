"use client";

import { IAuthUser } from "@/interface";
import { createContext, useContext } from "react";

interface IAuthContext {
    SetClient: (client: IAuthUser | null) => void;
    client: IAuthUser | null;
}

export const AuthContext = createContext<IAuthContext>({
    SetClient: (user: IAuthUser | null) => {},
    client: null,
});

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
