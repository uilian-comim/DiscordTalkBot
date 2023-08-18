import { useFormContext } from "react-hook-form";

interface CheckBoxProps {
    name: string;
    text: string;
    spanAddClass?: string;
    containerAddClass?: string;
}

export function CheckBox(props: CheckBoxProps) {
    const { register } = useFormContext();
    return (
        <div className={`form-control ${props.containerAddClass}`}>
            <label className="label cursor-pointer flex items-center justify-start gap-2">
                <input type="checkbox" className="toggle" {...register(props.name)} />
                <span className={`label-text uppercase font-primary font-medium ${props.spanAddClass}`}>{props.text}</span>
            </label>
        </div>
    );
}
