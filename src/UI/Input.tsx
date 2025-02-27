import { FC, JSX } from 'react';

export interface InputProps {
    icon?: JSX.Element;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({ icon, ...props }) => {
    return (
        <div className="flex items-center w-full rounded-lg bg-white pl-3 border border-gray-300 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-blue">
            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                {icon}
            </div>
            <input
                {...props}
                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 placeholder:font-light focus:outline-none sm:text-sm/6"
            />
        </div>
    );
};