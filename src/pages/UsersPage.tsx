import { useState } from 'react';

// services
import { useGetUsersQuery } from 'services/users'
// UI
import { Loader } from 'UI/Loader';
import { Table, Column } from 'UI/Table';
import { Card } from 'UI/Card';
// constants
import { LIMITS } from 'constants/filters';
// components
import UserFilters from 'components/UserFilters';
// hooks
import useSearch from 'hooks/useSearch';

const UsersPage = () => {
    const [limit, setLimit] = useState(LIMITS[0])
    const [filter, setFilter] = useState({})
    const [skip, setSkip] = useState(0);
    const { data, isLoading } = useGetUsersQuery({
        limit,
        skip,
        ...filter,
        hasFilters: Object.keys(filter).length > 0
    });
    const [filtered, setSearch] = useSearch(data?.users) as [Record<string, React.ReactNode>[], (value: string) => void];

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

    const handleFilterChange = (key: string, value: string) => {
        if (value === '') {
            setFilter({});
            return
        }

        setFilter({ key, value })
    }

    return (
        <Loader loading={isLoading}>
            <Card>
                <UserFilters
                    limit={limit}
                    onLimitChange={(value) => setLimit(value as number)}
                    filter={filter}
                    onFilterChange={handleFilterChange}
                    onSearchChange={setSearch}
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
        key: 'image',
        title: 'Image',
        render: (value) =>
            <img src={value as string} alt='user' className='w-10 h-10 mx-auto rounded-full' />
    },
    { key: 'firstName', title: 'First Name' },
    { key: 'lastName', title: 'Last Name' },
    { key: 'maidenName', title: 'Maiden Name' },
    { key: 'birthDate', title: 'Birth Date' },
    { key: 'age', title: 'Age' },
    { key: 'gender', title: 'Gender', render: (value) => <span className='capitalize'>{value as string}</span> },
    { key: 'email', title: 'Email' },
    { key: 'phone', title: 'Phone' },
    { key: 'username', title: 'Username' },
    { key: 'bloodGroup', title: 'Blood Group' },
    { key: 'eyeColor', title: 'Eye Color' },
    { key: 'height', title: 'Height' },
    { key: 'weight', title: 'Weight' },
    { key: 'ip', title: 'IP' },
]

export default UsersPage