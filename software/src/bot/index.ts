import { Client, GatewayIntentBits } from "discord.js";
import { readdirSync } from "fs";
import path from "path";

class Bot extends Client {
    public constructor() {
        super({
            intents: [
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.DirectMessageTyping,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
            ],
        });
    }

    async loadEvents() {
        const evtFiles = readdirSync(path.resolve(__dirname, "events"));

        await Promise.all(
            evtFiles.map(async (file) => {
                const eventName = file.split(".")[0];
                const { default: event } = await import(`./events/${file}`);
                this.on(eventName, event);
            }),
        ).then(() => console.log(evtFiles.length > 1 ? `Carregando o total de ${evtFiles.length} eventos.` : `Carregando o total de ${evtFiles.length} evento.`));
    }

    public async run(token: string) {
        try {
            this.loadEvents();
            this.login(token);
        } catch (err: any) {
            console.log(err);
        }
    }
}

export default Bot;
