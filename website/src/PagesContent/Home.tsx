import { Chat } from "@/components/Chat";

export function HomeContent() {
    return (
        <main className="w-full h-screen flex flex-col justify-end pt-20 overflow-hidden">
            <Chat />
        </main>
    );
}
