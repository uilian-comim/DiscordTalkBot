import { useAuth } from "@/context";
import Image from "next/image";

export function ClientInformation() {
    const { client } = useAuth();

    return (
        <div className="w-full h-max flex items-center justify-center gap-2">
            <div className="h-20 flex items-center justify-center avatar">
                <div className="w-14 mask mask-hexagon relative">
                    {client && <Image fill={true} src={client.avatar_url} alt="client_avatar" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />}
                </div>
            </div>
            {client && <span className="font-primary uppercase font-medium text-sm hidden opacity-0 md:visible md:opacity-100 md:inline">{client.username}</span>}
        </div>
    );
}
