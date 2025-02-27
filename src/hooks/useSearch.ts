import { useState, useMemo } from 'react'

// hooks
import useDebounce from 'hooks/useDebounce'


const useSearch = (data: unknown[]) => {
    const [search, setSearch] = useState<string>('');
    const debounced = useDebounce((value) => setSearch(value as string));

    const filteredData = useMemo(() => {
        if (!search) return data;
        return data.filter((item) =>
            Object.values(item as Record<string, string>).some((value) =>
                (value as string).toString().toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [data, search]);

    return [filteredData, debounced];
};

export default useSearch