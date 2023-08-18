"use client";

import { ModalContext } from "@/context";
import { ProviderProps } from "@/interface";
import { useMemo, useState } from "react";

export default function ModalProvider({ children }: ProviderProps) {
    const [isOpen, setOpen] = useState<"newChannel" | "filter" | null>(null);

    const value = useMemo(() => ({ isOpen, setOpen }), [isOpen]);

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
