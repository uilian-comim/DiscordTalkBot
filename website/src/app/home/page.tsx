import { HomeContent } from "@/PagesContent";
import { refresh } from "@/services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
    const token = cookies().get("access_token")?.value;
    if (!token) {
        redirect("/");
    } else {
        const response = await refresh(token);
        if (response.status !== 200) {
            redirect("/");
        }
    }

    return <HomeContent />;
}
