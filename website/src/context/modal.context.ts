"use client";

import { createContext, useContext } from "react";

interface IModalContext {
    isOpen: "newChannel" | "filter" | null;
    setOpen: (isOpen: "newChannel" | "filter" | null) => void;
}

export const ModalContext = createContext<IModalContext>({
    isOpen: null,
    setOpen: (isOpen: "newChannel" | "filter" | null) => {},
});

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used within an modalProvider");
    return context;
}
