import { useAuth, useChat, useModal } from "@/context";
import { AiOutlineFolderAdd, AiOutlineSearch } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { TbRefresh } from "react-icons/tb";

export function MenuSection() {
    const { SetClient } = useAuth();
    const { refresh } = useChat();
    const { setOpen } = useModal();

    return (
        <ul className="w-full flex flex-col items-center justify-center gap-2 md:px-4">
            <li
                onClick={() => setOpen("filter")}
                className="btn-ghost w-10 h-10 flex items-center justify-center gap-2 bg-base-200 rounded cursor-pointer md:w-full md:justify-start md:px-4"
            >
                <span className="h-full flex items-center justify-center">
                    <AiOutlineSearch />
                </span>
                <span className="h-full items-center justify-center hidden opacity-0 md:visible md:flex md:opacity-100">Buscar</span>
            </li>
            <li
                onClick={() => setOpen("newChannel")}
                className="btn-ghost w-10 h-10 flex items-center justify-center gap-2 bg-base-200 rounded cursor-pointer md:w-full md:justify-start md:px-4"
            >
                <span className="h-full flex items-center justify-center">
                    <AiOutlineFolderAdd />
                </span>
                <span className="h-full items-center justify-center hidden opacity-0 md:visible md:flex md:opacity-100">Abrir novo canal</span>
            </li>
            <li className="btn-ghost w-10 h-10 flex items-center justify-center gap-2 bg-base-200 rounded cursor-pointer md:w-full md:justify-start md:px-4" onClick={refresh}>
                <span className="h-full flex items-center justify-center">
                    <TbRefresh />
                </span>
                <span className="h-full items-center justify-center hidden opacity-0 md:visible md:flex md:opacity-100">Recarregar</span>
            </li>
            <li
                className="btn-ghost w-10 h-10 flex items-center justify-center gap-2 bg-base-200 rounded cursor-pointer md:w-full md:justify-start md:px-4"
                onClick={() => SetClient(null)}
            >
                <span className="h-full flex items-center justify-center">
                    <LuLogOut />
                </span>
                <span className="h-full items-center justify-center hidden opacity-0 md:visible md:flex md:opacity-100">Sair</span>
            </li>
        </ul>
    );
}
