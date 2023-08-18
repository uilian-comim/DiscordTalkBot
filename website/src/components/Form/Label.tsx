import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor: string;
    text: string;
    addClass?: string;
}

export function Label(props: LabelProps) {
    return (
        <label htmlFor={props.htmlFor} className={`label ${props.addClass}`}>
            <span className="label-text uppercase font-primary font-medium text-base">{props.text}</span>
        </label>
    );
}
