"use client";

import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    placeholder: string;
    addClass?: string;
}

export function Input(props: InputProps) {
    const { register } = useFormContext();
    return (
        <input type={props.type || "text"} id={props.name} placeholder={props.placeholder} className={`input input-bordered w-full ${props.addClass}`} {...register(props.name)} />
    );
}
