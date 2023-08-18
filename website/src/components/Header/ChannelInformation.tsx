import { useChat } from "@/context";

export function ChannelInformation() {
    const { userState, guildState, channelState, setChannelState } = useChat();
    if ((!userState.currentUser && !guildState.currentGuild) || !channelState.selectedChannelType) return null;

    return (
        <>
            {channelState.selectedChannelType === "user" ? (
                <div className="min-w-max h-full hidden flex-col items-start justify-between md:flex">
                    <span className="font-primary uppercase font-medium text-sm">{userState.currentUser?.name}</span>
                    <span className="font-primary uppercase font-medium text-sm">ID: {userState.currentUser?.id}</span>
                </div>
            ) : channelState.selectedChannelType === "guild" ? (
                <select
                    className="select w-full max-w-md"
                    defaultValue={guildState.currentGuild?.channels_guild[0].channel_id}
                    onChange={(event) => setChannelState({ ...channelState, currentChannelId: event.target.value })}
                >
                    {guildState.currentGuild?.channels_guild.map((channel) => (
                        <option value={channel.channel_id} key={channel.channel_id}>
                            {channel.channel_name}
                        </option>
                    ))}
                </select>
            ) : null}
        </>
    );
}
