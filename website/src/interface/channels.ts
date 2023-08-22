export interface IUser {
    id: string;
    name: string;
    avatar_url: string;
    channel_id: string;
    favorite: boolean;
    updated_at: string;
}

export interface IGuild {
    id: string;
    guild_id: string;
    name: string;
    avatar_url: string;
    favorite: boolean;
    created_at: string;
    channels_guild: Array<IChannelsGuild>;
    bot_id: string;
}

export interface IMessage {
    channel_id: string;
    id: string;
    author: Omit<IUser, "channel_id" | "favorite" | "updated_at">;
    content: string;
    createdAt: string;
}

export interface IChannelsGuild {
    channel_id: string;
    channel_name: string;
    guild_id: string;
}

export interface IGetChannelsResponse {
    status: number;
    message: string;
    information?: string;
    users: Array<IUser> | null;
    guilds: Array<IGuild> | null;
    total: number;
}

export interface IGetMessagesResponse {
    status: number;
    message: string;
    messages: Array<IMessage> | null;
}

export interface IFavoriteUserResponse {
    status: number;
    message: string;
    user: IUser | null;
}

export interface IFavoriteGuildResponse {
    status: number;
    message: string;
    guild: IGuild | null;
}

export interface IDeleteResponse {
    status: number;
    message: string;
}
