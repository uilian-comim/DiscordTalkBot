import { ButtonHTMLAttributes, ReactElement } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "btn-neutral" | "btn-ghost" | "btn-primary" | "btn-secondary" | "btn-error" | "btn-success" | "btn-warning" | "btn-info";
    type: "button" | "submit";
    text?: string;
    icon: ReactElement;
    addClass?: string;
}

export function Button(props: ButtonProps) {
    return (
        <button type={props.type} className={`w-full btn ${props.variant} ${props.addClass}`}>
            <span className="flex items-center justify-center gap-2 font-primary tracking-wider font-medium">
                {props.icon}
                {props.text}
            </span>
        </button>
    );
}
