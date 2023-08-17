import { TBot, TInstanceVerify } from "src/api/types";
import InstanceManager from "src/instances";

export async function instanceVerify(data: TBot | null): Promise<TInstanceVerify> {
    if (!data) {
        return {
            instance_id: "",
            isRunning: false,
            message: "Token informado não encontrado no banco de dados.",
        };
    }

    const instance = InstanceManager.getInstance(data.id);
    if (!instance) {
        return {
            instance_id: "",
            isRunning: false,
            message: "O token informado não pertence a nem um bot em execução, execute um bot com o token informado para fazer esta solicitação.",
        };
    }

    return {
        instance_id: instance.id,
        isRunning: true,
        message: "",
    };
}
