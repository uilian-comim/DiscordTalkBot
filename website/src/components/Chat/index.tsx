import Image from "next/image";
import { IoSend } from "react-icons/io5";

export function Chat() {
    return (
        <main className="w-full h-full flex flex-col">
            <div className="w-full h-full flex flex-col p-2">
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 relative rounded-full">
                            <Image fill={true} src="/avatar.png" alt="avatar" />
                        </div>
                    </div>
                    <div className="chat-header">
                        Tapete
                        <time className="text-xs opacity-50">12:45</time>
                    </div>
                    <div className="chat-bubble">Mas tu é pa frente loko veio!</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 relative rounded-full">
                            <Image fill={true} src="/avatar2.png" alt="avatar" />
                        </div>
                    </div>
                    <div className="chat-header">
                        Eu
                        <time className="text-xs opacity-50">12:46</time>
                    </div>
                    <div className="chat-bubble">Tu também loko!</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 relative rounded-full">
                            <Image fill={true} src="/avatar2.png" alt="avatar" />
                        </div>
                    </div>
                    <div className="chat-header">
                        Eu
                        <time className="text-xs opacity-50">12:49</time>
                    </div>
                    <div className="chat-bubble">Da para dar uns balaço no teu tiu?</div>
                </div>
            </div>
            <div className="w-full h-12 flex items-center bg-neutral p-2">
                <input
                    type="text"
                    placeholder="Digite aqui..."
                    className="w-full h-full bg-transparent outline-none pr-6"
                />
                <button className="w-8 h-8 flex items-center justify-center btn-ghost absolute right-2">
                    <IoSend />
                </button>
            </div>
        </main>
    );
}
