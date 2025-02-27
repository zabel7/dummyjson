import { FC } from "react";

// constants
import { LIMITS, GENDERS } from "constants/filters";
// components
import SearchBar from "./SearchBar";
// UI
import { Select } from "UI/Select";
import { Input } from "UI/Input";

interface UserFiltersProps {
    limit: number;
    onLimitChange: (value: number | string) => void;
    filter: Record<string, string>;
    onFilterChange: (key: string, value: string) => void;
    onSearchChange: (value: string) => void;
}

const UserFilters: FC<UserFiltersProps> = ({ limit, onLimitChange, filter, onFilterChange, onSearchChange }) => {
    return (
        <div className="flex gap-2 flex-wrap p-2 items-center w-full">
            <div className="flex gap-2 items-center w-[10rem]">
                <Select
                    options={LIMITS}
                    selected={limit}
                    onChange={onLimitChange}
                />
                <span className="text-gray-500 text-xs">Entries</span>
            </div>
            <SearchBar
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <div>
                <Input
                    placeholder='Name'
                    value={filter?.key === 'firstName' ? filter.value : ''}
                    onChange={(e) => onFilterChange('firstName', e.target.value)}
                />
            </div>
            <div>
                <Input
                    placeholder='Email'
                    value={filter?.key === 'email' ? filter.value : ''}
                    onChange={(e) => onFilterChange('email', e.target.value)}
                />
            </div>
            <div>
                <Input
                    placeholder='Birth Date'
                    value={filter?.key === 'birthDate' ? filter.value : ''}
                    onChange={(e) => onFilterChange('birthDate', e.target.value)}
                />
            </div>
            <div className="w-[10rem]">
                <Select
                    options={['All', ...GENDERS]}
                    selected={filter?.key === 'gender' ? filter.value : ''}
                    onChange={(value) => onFilterChange('gender', (value as string).toLowerCase())}
                    placeholder="Gender"
                />
            </div>
        </div >
    )
}

export default UserFilters