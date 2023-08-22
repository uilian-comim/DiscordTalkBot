"use client";

import { useAuth, useChat, useModal } from "@/context";
import { Create } from "@/services/Users";
import { schemas } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loading, Notify } from "notiflix";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { InferType } from "yup";
import { Form } from "../Form";

type FormData = InferType<typeof schemas.createModal>;

export function CreateModal() {
    const { client } = useAuth();
    const { isOpen, setOpen } = useModal();
    const modalForm = useForm<FormData>({
        resolver: yupResolver(schemas.createModal),
    });
    const { reset, handleSubmit } = modalForm;
    const { setUserState, userState, setChannelState, channelState } = useChat();

    const onSubmit = async (data: FormData) => {
        Loading.dots("Buscando", {
            clickToClose: false,
        });

        const response = await Create(data.user_id).finally(() => Loading.remove());

        if (response.status === 200 && response.user) {
            const users = userState.users!;
            users.push(response.user);
            setUserState({ currentUser: userState.currentUser, users: users });
            setChannelState({ total: channelState.total + 1, oldChannelId: channelState.currentChannelId, currentChannelId: null, selectedChannelType: null });
            setUserState({ users: userState.users, currentUser: null });
            Notify.success(response.message, {
                clickToClose: true,
            });
        } else {
            Notify.failure(response.message, {
                clickToClose: true,
            });
            response.information &&
                Notify.info(response.information, {
                    clickToClose: true,
                });
        }
        setOpen(null);
        reset();
    };

    return (
        <FormProvider {...modalForm}>
            <dialog id="my_modal_3" className={isOpen === "newChannel" ? "modal modal-open" : "modal"}>
                <form method="dialog" className="modal-box" onSubmit={handleSubmit(onSubmit)}>
                    <button type="button" onClick={() => setOpen(null)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                    <div className="flex flex-col items-center justify-center gap-4 pt-7">
                        <h1 className="uppercase font-primary font-medium text-sm text-center md:text-lg">Digite o ID do usuário que você deseja abrir um canal abaixo.</h1>
                        <div className="form-control w-full">
                            <Form.Label htmlFor="user_id" text="ID do usuário" />
                            <Form.Input name="user_id" placeholder="Digite aqui..." />
                        </div>
                        <Form.Link
                            href={`https://discord.com/api/oauth2/authorize?client_id=${client?.id}&permissions=8&scope=bot`}
                            icon={<BiLinkExternal />}
                            text="Adicionar a um servidor"
                        />
                        <Form.Button type="submit" icon={<AiOutlineUsergroupAdd />} text="Adicionar usuário" />
                    </div>
                </form>
            </dialog>
        </FormProvider>
    );
}
