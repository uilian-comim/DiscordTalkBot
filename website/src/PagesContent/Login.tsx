"use client";

import { Form } from "@/components/Form";
import { useAuth } from "@/context";
import { signin } from "@/services";
import { schemas } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { Loading, Notify } from "notiflix";
import { FormProvider, useForm } from "react-hook-form";
import { BiLinkExternal } from "react-icons/bi";
import { MdLogin } from "react-icons/md";
import { InferType } from "yup";

type FormData = InferType<typeof schemas.signin>;

export function LoginContent() {
    const { SetClient } = useAuth();

    const signInForm = useForm<FormData>({
        resolver: yupResolver(schemas.signin),
    });
    const { handleSubmit } = signInForm;

    const onSubmit = async (data: FormData) => {
        Loading.dots("Conectando-se", {
            clickToClose: false,
        });
        const response = await signin(data.token, data.keep).finally(() => Loading.remove());

        if (response.status === 200 && response.access_token && response.user) {
            Cookies.set("access_token", response.access_token);
            SetClient(response.user);
            Notify.success(response.message, {
                clickToClose: true,
            });
            if (data.save) {
                const tokens = Cookies.get("tokens");
                if (tokens) {
                    const tokensArray = tokens.split(",");
                    if (!tokensArray.find((token) => token.split("-")[1] === data.token)) {
                        Cookies.set("tokens", `${tokens},client:${response.user.username}-${data.token}`);
                    }
                    if (data.keep) {
                        Notify.info("O token será revogado caso você não logue por 7 dias", {
                            timeout: 20000,
                            clickToClose: true,
                        });
                    }
                } else {
                    Cookies.set("tokens", `client:${response.user.username}-${data.token}`);
                }
            }
        } else {
            Notify.failure(response.message, {
                clickToClose: true,
            });
        }
    };

    return (
        <FormProvider {...signInForm}>
            <form className="w-full flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="form-control w-full">
                    <Form.Label text="Bot Token" htmlFor="token" />
                    <Form.Input name="token" placeholder="Digite aqui..." />
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-2 self-start">
                    <Form.CheckBox name="save" text="Salvar Token" containerAddClass="w-full" />
                    <Form.CheckBox name="keep" text="Manter logado" containerAddClass="w-full" />
                </div>
                <div className="w-full flex flex-col justify-end items-center gap-4">
                    <Form.Button icon={<MdLogin />} type="submit" text="Conectar-se" variant="btn-neutral" addClass="flex-1" />
                    <Form.Link href="https://discord.com/developers/applications" icon={<BiLinkExternal />} variant="btn-neutral" text="Discord Developer Portal" />
                </div>
            </form>
        </FormProvider>
    );
}
