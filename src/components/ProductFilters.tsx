import { FC } from "react";

// services
import { useGetCategoryListQuery } from "services/category";
// constants
import { LIMITS } from "constants/filters";
// components
import SearchBar from "./SearchBar";
// UI
import { Select } from "UI/Select";
import { Input } from "UI/Input";
import Tabs from "UI/Tabs";

interface ProductFiltersProps {
    limit: number;
    onLimitChange: (value: number | string) => void;
    filter: Record<string, string>;
    query: Record<string, string>;
    onFilterChange: (key: string, value: string) => void;
    onSearchChange: (value: string) => void;
    onQueryChange: (key: string, value: string) => void;
}

const ProductFilters: FC<ProductFiltersProps> = ({ limit, onLimitChange, filter, query, onFilterChange, onSearchChange, onQueryChange }) => {
    const { data: categories = [] } = useGetCategoryListQuery({});


    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 flex-wrap p-2 items-center w-full ">
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
                        placeholder='Title'
                        value={query['title'] ?? ''}
                        onChange={(e) => onQueryChange('title', e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        placeholder='Brand'
                        value={query['brand'] ?? ''}
                        onChange={(e) => onQueryChange('brand', e.target.value)}
                    />
                </div>
                <div className="w-[15rem]">
                    <Select
                        options={['All', ...categories]}
                        selected={filter['category'] ?? ''}
                        onChange={(value) => onFilterChange('category', (value as string).toLowerCase())}
                        placeholder="Select Category"
                    />
                </div>

            </div>
            <div className="flex gap-2 px-2 pb-2 items-center ">
                <Tabs>
                    <Tabs.Tab active={!filter['category']}
                        onClick={() => onFilterChange('category', '')}
                    >
                        All
                    </Tabs.Tab>
                    <Tabs.Tab active={filter['category'] === 'laptops'}
                        onClick={() => onFilterChange('category', 'laptops')}
                    >
                        Laptops
                    </Tabs.Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default ProductFilters