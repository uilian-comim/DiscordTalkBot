import { SelectHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    defaultValue?: string;
}

export function Select(props: SelectProps) {
    const { register } = useFormContext();

    return (
        <select className="form-control w-full select" {...register(props.name)} {...props}>
            {props.children}
        </select>
    );
}
