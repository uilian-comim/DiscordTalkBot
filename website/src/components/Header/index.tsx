import { AiOutlineStar, AiOutlineUserAdd } from "react-icons/ai";
import { BiBlock } from "react-icons/bi";
import { TbMailCog } from "react-icons/tb";

export function Header() {
    return (
        <header className="w-full h-20 bg-base-300 p-2 pl-20 absolute top-0 right-0 md:pl-48 lg:pl-56">
            <div className="navbar bg-base-300 gap-2">
                <div className="min-w-max h-full flex flex-col items-start justify-between">
                    <span className="font-primary uppercase font-medium text-sm">Tapete</span>
                    <span className="font-primary uppercase font-medium text-sm">Tipo: Usuário</span>
                </div>
                <div className="flex justify-end flex-1 px-2 lg:opacity-0 lg:hidden">
                    <div className="flex items-stretch">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-square btn-outline">
                                <TbMailCog />
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu dropdown-content z-[1] p-2 shadow bg-base-200 rounded-box w-52 mt-4"
                            >
                                <li className="flex flex-row items-center justify-start">
                                    <span className="font-primary">
                                        <AiOutlineUserAdd />
                                        Adicionar usuário
                                    </span>
                                </li>
                                <li className="flex flex-row items-center justify-start">
                                    <span className="font-primary">
                                        <BiBlock />
                                        Bloquear usuário
                                    </span>
                                </li>
                                <li className="flex flex-row items-center justify-start">
                                    <span className="font-primary">
                                        <AiOutlineStar />
                                        Favoritar usuário
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="opacity-0 hidden w-full items-center justify-end gap-2 lg:opacity-100 lg:visible lg:flex">
                    <button className="btn-ghost flex items-center justify-center gap-2 px-4 py-2 font-primary uppercase text-sm tracking-wider bg-base-200 rounded">
                        <AiOutlineUserAdd />
                        Adicionar usuário
                    </button>
                    <button className="btn-ghost flex items-center justify-center gap-2 px-4 py-2 font-primary uppercase text-sm tracking-wider bg-base-200 rounded">
                        <BiBlock />
                        Bloquear usuário
                    </button>
                    <button className="btn-ghost flex items-center justify-center gap-2 px-4 py-2 font-primary uppercase text-sm tracking-wider bg-base-200 rounded">
                        <AiOutlineStar />
                        Favoritar usuário
                    </button>
                </div>
            </div>
        </header>
    );
}
