import { useChat } from "@/context";
import { ReactElement } from "react";
import { TbMailCog } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";

interface ButtonProps {
    icon: ReactElement;
    text: string;
    onclick: () => void;
}

interface MobileButtonProps {
    usersButtons: ButtonProps[];
    guildsButtons: ButtonProps[];
}

export function MobileActionButtons({ usersButtons, guildsButtons }: MobileButtonProps) {
    const { userState, guildState, channelState } = useChat();

    if ((!userState.currentUser && !guildState.currentGuild) || !channelState.selectedChannelType) return null;

    return (
        <div className="flex justify-end flex-1 px-2 xl:hidden">
            <div className="flex items-stretch">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-square btn-outline">
                        <TbMailCog />
                    </label>
                    <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-200 rounded-box w-52 mt-4">
                        {channelState.selectedChannelType === "user"
                            ? usersButtons.map((value) => (
                                  <li className="flex flex-row items-center justify-start" key={uuidv4()} onClick={value.onclick}>
                                      <span className="font-primary">
                                          {value.icon}
                                          {value.text}
                                      </span>
                                  </li>
                              ))
                            : guildsButtons.map((value) => (
                                  <li className="flex flex-row items-center justify-start" key={uuidv4()} onClick={value.onclick}>
                                      <span className="font-primary">
                                          {value.icon}
                                          {value.text}
                                      </span>
                                  </li>
                              ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
