import { FC, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

// UI
import { Input, InputProps } from 'UI/Input';


const SearchBar: FC<InputProps> = (props) => {
    const [showInput, setShowInput] = useState(false);

    const handleToggleInput = () => {
        setShowInput((prev) => !prev);
    }

    return (
        <div className='px-2 border-x border-gray-200 flex items-center gap-2'>

            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 cursor-pointer"
                onClick={handleToggleInput}
            />
            <div className={`transition-opacity duration-300 ${showInput ? 'block' : 'hidden'}`}>
                <Input
                    {...props}
                    icon={<MagnifyingGlassIcon className="w-4 h-4" />}
                    placeholder="Search..."
                />
            </div>
        </div>
    );
};

export default SearchBar;

