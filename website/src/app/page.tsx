import { LoginContent } from "@/PagesContent";
import { Footer } from "@/components/Footer";

export default async function Login() {
    return (
        <div className="w-full min-h-screen h-full">
            <div className="w-full h-full flex justify-center px-8 py-8 bg-base-100 md:py-12 lg:py-20">
                <div className="max-w-3xl h-max flex flex-col items-center justify-center gap-6 bg-base-200 px-4 py-8 rounded md:px-8 md:py-9">
                    <h1 className="uppercase font-primary font-medium text-lg text-center">DIGITE O TOKEN DO BOT PARA CONTINUAR</h1>
                    <LoginContent />
                </div>
            </div>
            <Footer />
        </div>
    );
}
