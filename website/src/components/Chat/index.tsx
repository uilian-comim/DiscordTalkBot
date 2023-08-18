"use client";

import { useAuth, useChat, useSocket } from "@/context";
import { schemas } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { Notify } from "notiflix";
import { FormProvider, useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { InferType } from "yup";
import { Form } from "../Form";
import { ChatContent } from "./Content";

type FormData = InferType<typeof schemas.chat>;

export function Chat() {
    const { client } = useAuth();
    const { SendMessage, setMessage } = useSocket();
    const { userState, guildState, channelState } = useChat();

    const chatForm = useForm<FormData>({
        resolver: yupResolver(schemas.chat),
    });

    const { handleSubmit, reset } = chatForm;

    const onSubmit = async (data: FormData) => {
        if ((!userState.currentUser && !guildState.currentGuild) || !channelState.currentChannelId || !data.message) return;
        if (!client)
            return Notify.failure("Não foi possível enviar a mensagem, verifique o usuário logado.", {
                clickToClose: true,
            });

        if (data.message.length > 2000) {
            return Notify.failure("A mensagem não pode ter mais de 2000 caracteres.", {
                clickToClose: true,
            });
        }

        SendMessage(data.message, client, channelState.currentChannelId);
        const localMessage = {
            content: data.message,
            channel_id: channelState.currentChannelId,
            id: uuidv4(),
            author: {
                id: client.id,
                name: client.username,
                avatar_url: client.avatar_url,
            },
            createdAt: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
        };
        setMessage(localMessage);
        reset();
    };

    return (
        <FormProvider {...chatForm}>
            <ChatContent />
            {userState.currentUser || guildState.currentGuild ? (
                <form autoComplete="off" className="w-full h-12 grid grid-cols-chat-footer bg-neutral sticky bottom-0 left-0" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Input name="message" placeholder="Digite aqui..." addClass="h-full bg-transparent border-none outline-none" />
                    <Form.Button icon={<IoSend />} type="submit" variant="btn-ghost" addClass="hover:bg-transparent" />
                </form>
            ) : null}
        </FormProvider>
    );
}
