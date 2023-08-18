import { Aside } from "@/components/Aside";
import { Header } from "@/components/Header";
import { ProviderProps } from "@/interface";

export default function HomeLayout({ children }: ProviderProps) {
    return (
        <section className="w-full h-full min-h-screen flex flex-col justify-end pl-20 md:pl-48 lg:pl-56">
            <Header />
            <Aside />
            {children}
        </section>
    );
}
