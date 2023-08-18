import { ReactElement } from "react";

interface LinkProps {
    variant?: "btn-neutral" | "btn-primary" | "btn-secondary" | "btn-error" | "btn-success" | "btn-warning" | "btn-info";
    href: string;
    text?: string;
    icon: ReactElement;
    addClass?: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
}

export function Link(props: LinkProps) {
    return (
        <a className={`btn ${props.variant} w-full ${props.addClass}`} target={props.target || "_blank"} href={props.href}>
            <span className="flex items-center justify-center gap-2 font-primary tracking-wider font-medium">
                {props.icon}
                {props.text}
            </span>
        </a>
    );
}
