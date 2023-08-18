import { ProviderProps } from "@/interface";
import AuthProvider from "./auth.provider";
import ChatProvider from "./chat.provider";
import ModalProvider from "./modal.provider";
import SocketProvider from "./socket.provider";

export default function Providers({ children }: ProviderProps) {
    return (
        <AuthProvider>
            <SocketProvider>
                <ChatProvider>
                    <ModalProvider>{children}</ModalProvider>
                </ChatProvider>
            </SocketProvider>
        </AuthProvider>
    );
}
