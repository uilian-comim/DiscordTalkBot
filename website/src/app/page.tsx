import { Footer } from "@/components/Footer";
import { MdLogin } from "react-icons/md";

export default function Login() {
    return (
        <div className="w-full min-h-screen h-full">
            <div className="w-full h-full flex justify-center px-8 py-8 bg-base-100 md:py-12 lg:py-20">
                <div className="max-w-3xl h-max flex flex-col items-center justify-center gap-6 bg-base-200 px-4 py-8 rounded md:px-8 md:py-9">
                    <h1 className="uppercase font-primary font-medium text-lg text-center">
                        DIGITE O TOKEN DO BOT PARA CONTINUAR
                    </h1>
                    <div className="w-full flex flex-col items-center justify-center gap-4">
                        <div className="form-control w-full">
                            <label htmlFor="token" className="label">
                                <span className="label-text uppercase font-primary font-medium text-base">
                                    Bot Token
                                </span>
                            </label>
                            <input
                                type="text"
                                id="token"
                                placeholder="Digite aqui..."
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center gap-2 self-start">
                            <div className="form-control">
                                <label className="label cursor-pointer flex items-center justify-start gap-2">
                                    <input type="checkbox" className="toggle" />
                                    <span className="label-text uppercase font-primary font-medium">Salvar token</span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer flex items-center justify-start gap-2">
                                    <input type="checkbox" className="toggle" />
                                    <span className="label-text uppercase font-primary font-medium">Manter logado</span>
                                </label>
                            </div>
                        </div>
                        <button className="btn btn-neutral w-full">
                            <span className="flex items-center justify-center gap-2 font-primary tracking-wider font-medium">
                                <MdLogin />
                                Conectar-se
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
