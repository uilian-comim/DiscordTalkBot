import { useChat } from "@/context";
import Image from "next/image";

export function ChannelsList() {
    const { userState, guildState, channelState, setUserState, setGuildState, setChannelState } = useChat();

    if ((!userState.users || userState.users.length <= 0) && (!guildState.guilds || guildState.guilds.length <= 0)) return null;

    return (
        <div className="w-full flex flex-col items-center justify-start gap-2 overflow-auto md:px-4">
            {userState.users?.map((user) => (
                <div
                    className={`btn-ghost cursor-pointer w-full flex flex-col items-center justify-center gap-2 px-1 py-2 avatar md:rounded ${
                        userState.currentUser?.id === user.id ? "bg-neutral" : "bg-base-300"
                    }`}
                    key={user.id}
                    onClick={() => {
                        setChannelState({ oldChannelId: channelState.currentChannelId, currentChannelId: user.channel_id, selectedChannelType: "user" });
                        setUserState({ currentUser: user, users: userState.users });
                        setGuildState({ currentGuild: null, guilds: guildState.guilds });
                    }}
                >
                    <div className="w-14 mask mask-squircle relative">
                        <Image fill={true} src={user.avatar_url} alt="user_avatar" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    </div>
                    <span className="w-full uppercase font-primary font-medium text-center overflow-hidden text-ellipsis">{user.name}</span>
                </div>
            ))}
            {guildState.guilds?.map((guild) => (
                <div
                    className={`btn-ghost cursor-pointer w-full flex flex-col items-center justify-center gap-2 px-1 py-2 avatar md:rounded ${
                        guild.guild_id === guildState.currentGuild?.guild_id ? "bg-neutral" : "bg-base-300"
                    }`}
                    key={guild.id}
                    onClick={() => {
                        setChannelState({ oldChannelId: channelState.currentChannelId, currentChannelId: guild.channels_guild[0].channel_id, selectedChannelType: "guild" });
                        setGuildState({ currentGuild: guild, guilds: guildState.guilds });
                        setUserState({ currentUser: null, users: userState.users });
                    }}
                >
                    <div className="w-14 mask mask-squircle relative">
                        <Image fill={true} src={guild.avatar_url} alt="user_avatar" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    </div>
                    <span className="w-full uppercase font-primary font-medium text-center overflow-hidden text-ellipsis">{guild.name}</span>
                </div>
            ))}
        </div>
    );
}
