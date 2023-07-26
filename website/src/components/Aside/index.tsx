import Image from "next/image";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { TbFilterCog } from "react-icons/tb";

export function Aside() {
    return (
        <aside className="w-20 h-screen fixed left-0 top-0 flex flex-col items-center justify-start gap-4 bg-base-300 md:w-48 lg:w-56">
            <div className="w-full h-max flex items-center justify-center gap-2">
                <div className="h-20 flex items-center justify-center avatar">
                    <div className="w-14 mask mask-hexagon relative">
                        <Image fill={true} src="/avatar.gif" alt="user_avatar" />
                    </div>
                </div>
                <span className="font-primary uppercase font-medium text-sm hidden opacity-0 md:visible md:opacity-100 md:inline">
                    BOT NAME
                </span>
            </div>
            <ul className="w-full flex flex-col items-center justify-center gap-2 md:px-4">
                <li className="btn-ghost w-10 h-10 flex items-center justify-center gap-2 bg-base-200 rounded cursor-pointer md:w-full md:justify-start md:px-4">
                    <span className="h-full flex items-center justify-center">
                        <AiOutlineFolderAdd />
                    </span>
                    <span className="h-full items-center justify-center hidden opacity-0 md:visible md:flex md:opacity-100">
                        Abrir novo canal
                    </span>
                </li>
                <li className="btn-ghost w-10 h-10 flex items-center justify-center gap-2 bg-base-200 rounded cursor-pointer md:w-full md:justify-start md:px-4">
                    <span className="h-full flex items-center justify-center">
                        <TbFilterCog />
                    </span>
                    <span className="h-full items-center justify-center hidden opacity-0 md:visible md:flex md:opacity-100">
                        Filtrar
                    </span>
                </li>
                <li className="btn-ghost w-10 h-10 flex items-center justify-center gap-2 bg-base-200 rounded cursor-pointer md:w-full md:justify-start md:px-4">
                    <span className="h-full flex items-center justify-center">
                        <LuLogOut />
                    </span>
                    <span className="h-full items-center justify-center hidden opacity-0 md:visible md:flex md:opacity-100">
                        Sair
                    </span>
                </li>
            </ul>
            <div className="w-full flex flex-col items-center justify-start gap-2 overflow-auto md:px-4">
                <div className="btn-ghost cursor-pointer w-full flex flex-col items-center justify-center gap-2 px-1 py-2 avatar bg-neutral md:rounded">
                    <div className="w-14 mask mask-squircle relative">
                        <Image fill={true} src="/avatar.png" alt="user_avatar" />
                    </div>
                    <span className="w-full uppercase font-primary font-medium text-center overflow-hidden text-ellipsis">
                        Tapete
                    </span>
                </div>
                <div className="btn-ghost cursor-pointer w-full flex flex-col items-center justify-center gap-2 px-1 py-2 avatar bg-neutral-focus md:rounded">
                    <div className="w-14 mask mask-squircle relative">
                        <Image fill={true} src="/avatar.gif" alt="user_avatar" />
                    </div>
                    <span className="w-full uppercase font-primary font-medium text-center overflow-hidden text-ellipsis">
                        Luis Clark
                    </span>
                </div>
                <div className="btn-ghost cursor-pointer w-full flex flex-col items-center justify-center gap-2 px-1 py-2 avatar bg-neutral-focus md:rounded">
                    <div className="w-14 mask mask-squircle relative">
                        <Image fill={true} src="/avatar.gif" alt="user_avatar" />
                    </div>
                    <span className="w-full uppercase font-primary font-medium text-center overflow-hidden text-ellipsis">
                        Matheus
                    </span>
                </div>
                <div className="btn-ghost cursor-pointer w-full flex flex-col items-center justify-center gap-2 px-1 py-2 avatar bg-neutral-focus md:rounded">
                    <div className="w-14 mask mask-squircle relative">
                        <Image fill={true} src="/avatar.gif" alt="user_avatar" />
                    </div>
                    <span className="w-full uppercase font-primary font-medium text-center overflow-hidden text-ellipsis">
                        Xico
                    </span>
                </div>
                <div className="btn-ghost cursor-pointer w-full flex flex-col items-center justify-center gap-2 px-1 py-2 avatar bg-neutral-focus md:rounded">
                    <div className="w-14 mask mask-squircle relative">
                        <Image fill={true} src="/avatar.gif" alt="user_avatar" />
                    </div>
                    <span className="w-full uppercase font-primary font-medium text-center overflow-hidden text-ellipsis">
                        Rapunzelasdas
                    </span>
                </div>
            </div>
        </aside>
    );
}
