import Bot from "src/bot";
import io from "src/socket";
import { TInstance } from "./types";

class InstanceManager {
    private static instances: Array<TInstance> = [];

    private constructor() {}

    public static createInstance(id: string): TInstance {
        const instance = this.instances.find((instance) => instance.id === id);
        if (!instance) {
            this.instances.push({
                id,
                instance: new Bot(),
            });

            const i = this.instances.find((instance) => instance.id === id);
            if (!i) {
                console.log(instance);
                throw new Error("[create instance error] - Erro desconhecido, contate um administrador");
            }
            console.log(`[instance manager] - Nova instância criada com id ${id}`);
            return i;
        }
        this.closeInstance(id);
        return this.createInstance(id);
    }

    public static getInstance(id: string): TInstance | null {
        const instance = this.instances.find((instance) => instance.id === id);
        return instance || null;
    }

    public static closeInstance(id: string) {
        const index = this.instances.findIndex((instance) => instance.id === id);
        if (index === -1) throw new Error("[close instance error] - Erro desconhecido, contate um administrador");
        io.emit("instance:destroy", {
            id,
            message: "Instância finalizada, outro usuário se conectou ao mesmo bot",
        });
        const instance = this.getInstance(id);
        if (!instance) throw new Error("[close instance error] - Erro desconhecido, contate um administrador");
        instance.instance.destroy();
        this.instances.splice(index, 1);
    }

    public static getAllInstances(): Array<TInstance> {
        return this.instances;
    }

    public static instanceRebuild(i: TInstance, id: string): TInstance {
        this.closeInstance(i.id);
        return this.createInstance(id);
    }
}

export default InstanceManager;
