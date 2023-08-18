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
        const response = await signin(data.token).finally(() => Loading.remove());

        if (response.status === 200 && response.access_token && response.user) {
            Cookies.set("access_token", response.access_token);
            SetClient(response.user);
            Notify.success(response.message, {
                clickToClose: true,
            });
        } else {
            Notify.failure(response.message, {
                clickToClose: true,
            });
        }
    };

    return (
        <FormProvider {...signInForm}>
            <form className="w-full flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                {/* <div className="form-control w-full">
                    <Form.Label text="Bot Token" htmlFor="token" />
                    <Form.Input name="token" placeholder="Digite aqui..." />
                </div> */}
                <Form.Select name="token" defaultValue="NjIzOTQyMjE0NTMxMjg1MDA0.Gm4FC2.-ZQQamNjlJm_hK6KA-T846MSO9VmRundvklis0">
                    <option value="MTEzMzg3MDE1OTA0NDU1NDc1Mg.GSqQmS.4-ZXNkPnuI0b9osBe0iN16Bhh9MTHonJo7cjXA">discord_talk_bot</option>
                    <option value="NjIzOTQyMjE0NTMxMjg1MDA0.Gm4FC2.-ZQQamNjlJm_hK6KA-T846MSO9VmRundvklis0">Albedo</option>
                </Form.Select>
                <div className="flex flex-col items-start justify-center gap-2 self-start">
                    <Form.CheckBox name="save" text="Salvar Token" />
                    <Form.CheckBox name="keep" text="Manter logado" />
                </div>
                <div className="w-full flex flex-col justify-end items-center gap-4">
                    <Form.Button icon={<MdLogin />} type="submit" text="Conectar-se" variant="btn-neutral" />
                    <Form.Link href="https://discord.com/developers/applications" icon={<BiLinkExternal />} variant="btn-neutral" text="Discord Developer Portal" />
                </div>
            </form>
        </FormProvider>
    );
}
