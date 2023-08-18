"use client";

import { AuthContext } from "@/context";
import { IAuthUser, ProviderProps } from "@/interface";
import { refresh, signout } from "@/services";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Loading, Notify } from "notiflix";
import { useEffect, useMemo, useState } from "react";

export default function AuthProvider({ children }: ProviderProps) {
    const router = useRouter();
    const [client, setClient] = useState<IAuthUser | null>(null);

    useEffect(() => {
        const token = Cookies.get("access_token");
        if (token) {
            refresh(token).then((response) => {
                if (response.status === 200 && response.access_token && response.user) {
                    Cookies.set("access_token", response.access_token);
                    setClient(response.user);
                    Notify.success(response.message, {
                        clickToClose: true,
                    });
                } else {
                    Notify.failure(response.message, {
                        clickToClose: true,
                    });
                    Cookies.remove("access_token");
                }
            });
        }
    }, []);

    function SetClient(client: IAuthUser | null) {
        Loading.circle("Atualizando dados do usuário...", {
            clickToClose: false,
        });
        if (client) {
            setClient(client);
            router.push("/home");
        } else {
            signout().finally(() => Loading.remove());
            setClient(null);
            Cookies.remove("access_token");
            router.push("/");
        }
    }

    const value = useMemo(() => ({ client, SetClient }), [client]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
