import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface RadioProps {
    text?: string;
    spanAddClass?: string;
    containerAddClass?: string;
    value: string;
    setTypeToken: Dispatch<SetStateAction<string>>;
}

export function Radio({ setTypeToken, value, spanAddClass, containerAddClass }: RadioProps) {
    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTypeToken(event.target.value);
    };
    return (
        <div className={`w-full flex flex-col gap-2 ${containerAddClass}`}>
            <div className="form-control flex items-start justify-center">
                <label className="w-full flex items-center gap-2 pl-1 text-center">
                    <input type="radio" name="token" className="radio checked:bg-neutral" value="digite" onChange={handleRadioChange} checked={value === "digite"} />
                    <span className={`label-text uppercase font-primary font-medium cursor-pointer ${spanAddClass}`}>Digitar token</span>
                </label>
            </div>
            <div className="form-control flex items-start justify-center">
                <label className="w-full flex items-center gap-2 pl-1 text-center">
                    <input type="radio" name="token" className="radio checked:bg-neutral" value="select" onChange={handleRadioChange} checked={value === "select"} />
                    <span className={`label-text uppercase font-primary font-medium cursor-pointer ${spanAddClass}`}>Selecionar um token salvo</span>
                </label>
            </div>
        </div>
    );
}
