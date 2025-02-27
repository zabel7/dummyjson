import { FC } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'



interface SelectProps {
    options: string[] | number[],
    selected: string | number,
    onChange: (option: string | number) => void,
    placeholder?: string
}

export const Select: FC<SelectProps> = ({ options, selected, onChange, placeholder = 'Select' }) => {

    return (
        <Listbox value={selected} onChange={onChange}>
            <div className="relative w-full">
                <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue sm:text-sm/6">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                        <span className="block truncate capitalize">{selected || placeholder}</span>
                    </span>
                    <ChevronUpDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                >
                    {options.map((option) => (
                        <ListboxOption
                            key={option}
                            value={option === 'All' ? '' : option}
                            className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-blue"
                        >
                            <span className="block truncate font-normal text-sm group-data-selected:font-semibold capitalize">{option}</span>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-black group-not-data-selected:hidden">
                                <CheckIcon aria-hidden="true" className="size-5" />
                            </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}
