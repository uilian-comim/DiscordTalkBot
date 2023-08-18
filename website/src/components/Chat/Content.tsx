import { useAuth, useSocket } from "@/context";
import Image from "next/image";
import { emojify } from "node-emoji";
import { useEffect, useRef } from "react";

export function ChatContent() {
    const { client } = useAuth();
    const { messageState } = useSocket();
    const messagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messageState.messages]);
    if (!messageState.messages || messageState.messages.length === 0) return null;
    return (
        <div ref={messagesRef} className="w-full h-full max-h-full flex flex-col p-2 overflow-y-auto overflow-x-hidden">
            {messageState.messages.map((message) => (
                <div className={message.author.id != client?.id ? "chat chat-start" : "chat chat-end"} key={message.id}>
                    {message.author.avatar_url && (
                        <div className="chat-image avatar">
                            <div className="w-10 relative rounded-full">
                                <Image fill={true} src={message.author.avatar_url} alt={message.author.avatar_url} />
                            </div>
                        </div>
                    )}
                    <div className="chat-header">
                        {message.author.id === client?.id ? "Eu" : message.author.name}
                        <time className="text-xs opacity-50">{message.createdAt}</time>
                    </div>
                    <div className="chat-bubble">{emojify(message.content)}</div>
                </div>
            ))}
        </div>
    );
}
