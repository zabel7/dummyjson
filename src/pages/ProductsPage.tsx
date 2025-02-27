import { useState } from 'react';

// services
import { useGetProductsQuery } from 'services/products'
// UI
import { Loader } from 'UI/Loader';
import { Table, Column } from 'UI/Table';
import { Card } from 'UI/Card';
// constants
import { LIMITS } from 'constants/filters';
// components
import ProductFilters from 'components/ProductFilters';
// hooks
import useSearch from 'hooks/useSearch';

const ProductsPage = () => {
    const [limit, setLimit] = useState(LIMITS[0])
    const [filter, setFilter] = useState({})
    const [query, setQuery] = useState({})
    const [skip, setSkip] = useState(0);
    const { data, isLoading } = useGetProductsQuery({
        limit,
        skip,
        ...filter,
        q: Object.values(query)?.[0] as string,
    });
    const [filtered, setSearch] = useSearch(data?.products) as [Record<string, React.ReactNode>[], (value: string) => void];

    const handleNext = () => {
        setSkip(data?.skip + data?.limit)
    }

    const handlePrev = () => {
        if (data?.skip === 0) return
        setSkip(data?.skip - data?.limit)
    }

    const handlePage = (page: number) => {
        setSkip((page - 1) * data?.limit)
    }

    const handleQueryChange = (key: string, value: string) => {
        if (value === '') {
            setQuery({});
            return
        }

        setQuery({ [key]: value })
    }

    const handleFilterChange = (key: string, value: string) => {
        if (value === '') {
            setFilter({});
            return
        }

        setFilter({ [key]: value })
    }

    return (
        <Loader loading={isLoading}>
            <Card>
                <ProductFilters
                    limit={limit}
                    onLimitChange={(value) => setLimit(value as number)}
                    filter={filter}
                    query={query}
                    onFilterChange={handleFilterChange}
                    onSearchChange={setSearch}
                    onQueryChange={handleQueryChange}
                />
                <Table
                    data={filtered}
                    columns={columns}
                    limit={limit}
                    skip={data?.skip}
                    total={data?.total}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onPage={handlePage}
                />

            </Card>
        </Loader>
    )
}

const columns: Column[] = [
    {
        key: 'thumbnail',
        title: 'Thumbnail',
        render: (value) =>
            <img src={value as string} alt='product' className='w-12 h-12 mx-auto rounded-lg' />
    },
    { key: 'title', title: 'Title' },
    { key: 'brand', title: 'Brand' },
    { key: 'price', title: 'Price' },
    {
        key: 'category',
        title: 'Category',
        render: (value) => <span className='capitalize'>{value as string}</span>,
    },
    { key: 'availabilityStatus', title: 'Availability Status' },
    { key: 'description', title: 'Description', render: (value) => <p className='truncate w-sm'>{value as string}</p> },
    { key: 'stock', title: 'Stock' },
    { key: 'rating', title: 'Rating' },
    { key: 'discountPercentage', title: 'Discount Percentage' },
    { key: 'returnPolicy', title: 'Return Policy' },
    { key: 'warrantyInformation', title: 'Warranty Information' },
    { key: 'shippingInformation', title: 'Shipping Information' },
]

export default ProductsPage