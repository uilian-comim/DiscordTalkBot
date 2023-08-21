"use client";

import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    placeholder: string;
    addClass?: string;
}

export function Input({ name, placeholder, addClass, ...rest }: InputProps) {
    const { register } = useFormContext();
    return <input placeholder={placeholder} type="text" id={name} className={`input input-bordered w-full ${addClass && addClass}`} {...register(name)} {...rest} />;
}
