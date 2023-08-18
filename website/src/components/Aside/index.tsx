"use client";

import { ChannelsList } from "./ChannelsList";
import { ClientInformation } from "./ClientInformation";
import { MenuSection } from "./MenuSection";

export function Aside() {
    return (
        <aside className="w-20 h-screen fixed left-0 top-0 flex flex-col items-center justify-start gap-4 bg-base-300 md:w-48 lg:w-56 z-10 pb-2">
            <ClientInformation />
            <MenuSection />
            <ChannelsList />
        </aside>
    );
}
