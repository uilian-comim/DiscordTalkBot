import * as yup from "yup";

export const schemas = {
    signin: yup.object().shape({
        token: yup.string().required("O token é obrigatório"),
        save: yup.boolean().required("Erro ao salvar token"),
        keep: yup.boolean().required("Erro ao manter logado"),
    }),
    chat: yup.object().shape({
        message: yup.string().required("É obrigatório algum conteúdo."),
    }),
    createModal: yup.object().shape({
        user_id: yup.string().required(),
    }),
    searchModal: yup.object().shape({
        search: yup.string().required(),
        users: yup.boolean().required(),
        guilds: yup.boolean().required(),
    }),
};
