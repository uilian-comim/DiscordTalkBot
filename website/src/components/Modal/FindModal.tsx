"use client";

import { useChat, useModal, useSocket } from "@/context";
import { Find } from "@/services";
import { schemas } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loading, Notify } from "notiflix";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import { InferType } from "yup";
import { Form } from "../Form";

type FormData = InferType<typeof schemas.searchModal>;

export function FindModal() {
    const { isOpen, setOpen } = useModal();
    const searchForm = useForm<FormData>({
        resolver: yupResolver(schemas.searchModal),
    });
    const { register, reset, handleSubmit } = searchForm;
    const { setUserState, setGuildState, setChannelState, channelState } = useChat();
    const { setMessageState } = useSocket();

    const onSubmit = async (data: FormData) => {
        Loading.dots("Buscando", {
            clickToClose: false,
        });
        const response = await Find(data.search, data.guilds, data.users).finally(() => Loading.remove());

        if ((response.status === 200 && response.users) || (response.status === 200 && response.guilds)) {
            setUserState({ currentUser: null, users: response.users });
            setGuildState({ currentGuild: null, guilds: response.guilds });
            setMessageState({ messages: null });
            setChannelState({ oldChannelId: channelState.currentChannelId, currentChannelId: null, selectedChannelType: null });
            Notify.success(response.message, {
                clickToClose: true,
            });
        } else {
            setUserState({ currentUser: null, users: null });
            setGuildState({ currentGuild: null, guilds: null });
            setMessageState({ messages: null });
            setChannelState({ oldChannelId: channelState.currentChannelId, currentChannelId: null, selectedChannelType: null });
            Notify.failure(response.message, {
                clickToClose: true,
            });
        }

        setOpen(null);
        reset();
    };

    return (
        <FormProvider {...searchForm}>
            <dialog id="my_modal_2" className={isOpen === "filter" ? "modal modal-open" : "modal"}>
                <form method="dialog" className="modal-box" onSubmit={handleSubmit(onSubmit)}>
                    <button type="button" onClick={() => setOpen(null)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                    <div className="flex flex-col items-center justify-center gap-4 pt-7">
                        <h1 className="uppercase font-primary font-medium text-sm text-center md:text-lg">Digite o ID ou NOME do canal que você deseja buscar abaixo.</h1>
                        <div className="form-control w-full">
                            <Form.Label htmlFor="search" text="ID ou NOME" />
                            <Form.Input name="search" placeholder="Digite aqui..." />
                        </div>
                        <Form.CheckBox name="users" text="Usuários" containerAddClass="w-full" />
                        <Form.CheckBox name="guilds" text="Servidores" containerAddClass="w-full" />
                        <Form.Button type="submit" icon={<AiOutlineSearch />} text="Buscar" variant="btn-success" />
                    </div>
                </form>
            </dialog>
        </FormProvider>
    );
}
