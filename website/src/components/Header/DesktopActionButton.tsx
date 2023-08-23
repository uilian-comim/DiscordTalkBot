import { useChat } from "@/context";
import { ReactElement } from "react";
import { v4 as uuidv4 } from "uuid";

interface ButtonProps {
    icon: ReactElement;
    text: string;
    onclick: () => void;
}

interface DesktopButtonProps {
    usersButtons: ButtonProps[];
    guildsButtons: ButtonProps[];
}
export function DesktopActionButtons({ usersButtons, guildsButtons }: DesktopButtonProps) {
    const { userState, guildState, channelState } = useChat();

    if ((!userState.currentUser && !guildState.currentGuild) || !channelState.selectedChannelType) return null;

    return (
        <div className="hidden items-center justify-end gap-2 xl:flex">
            {channelState.selectedChannelType === "user"
                ? usersButtons.map((button) => (
                      <button
                          key={uuidv4()}
                          className="btn-ghost flex items-center justify-center gap-2 px-2 py-2 font-primary uppercase text-sm tracking-wider bg-base-200 rounded"
                          onClick={button.onclick}
                      >
                          {button.icon}
                          {button.text}
                      </button>
                  ))
                : guildsButtons.map((button) => (
                      <button
                          key={uuidv4()}
                          className="btn-ghost flex items-center justify-center gap-2 px-2 py-2 font-primary uppercase text-sm tracking-wider bg-base-200 rounded"
                          onClick={button.onclick}
                      >
                          {button.icon}
                          {button.text}
                      </button>
                  ))}
        </div>
    );
}
