import { FC, Fragment, JSX, ReactNode } from "react";

export interface Column {
    key: string;
    title: string;
    render?: (value: unknown) => ReactNode | JSX.Element;
}

interface TableProps {
    columns: Column[];
    data: Record<string, ReactNode | string>[];
    total?: number;
    limit?: number;
    skip?: number;
    onNext?: () => void;
    onPrev?: () => void;
    onPage?: (page: number) => void;
}

export const Table: FC<TableProps> = ({
    columns,
    data,
    total = 0,
    limit = 0,
    skip = 0,
    onNext,
    onPrev,
    onPage,
}) => {

    const pages = Math.ceil(total / limit);
    const currentPage = Math.floor(skip / limit) + 1;

    const renderCell = (cell: ReactNode) => {
        return <td className="px-6 py-4 text-nowrap">
            {cell}
        </td>
    }

    const renderPagination = () => {
        const paginationItems = [];
        const maxButtons = 5;

        if (pages <= maxButtons) {
            for (let i = 1; i <= pages; i++) {
                paginationItems.push(
                    <PaginationButton
                        key={i}
                        page={i}
                        isActive={currentPage === i}
                        onClick={() => onPage?.(i)}
                    />
                );
            }
        } else {
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(pages, currentPage + 2);

            if (currentPage <= 3) {
                endPage = maxButtons;
            } else if (currentPage >= pages - 2) {
                startPage = pages - maxButtons + 1;
            }

            for (let i = startPage; i <= endPage; i++) {
                paginationItems.push(
                    <PaginationButton
                        key={i}
                        page={i}
                        isActive={currentPage === i}
                        onClick={() => onPage?.(i)}
                    />
                );
            }

            if (startPage > 1) {
                paginationItems.unshift(
                    <li key="start-ellipsis">
                        <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500">...</span>
                    </li>
                );
                paginationItems.unshift(
                    <PaginationButton
                        key={1}
                        page={1}
                        isActive={currentPage === 1}
                        onClick={() => onPage?.(1)}
                    />
                );
            }

            if (endPage < pages) {
                paginationItems.push(
                    <li key="end-ellipsis">
                        <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500">...</span>
                    </li>
                );
                paginationItems.push(
                    <PaginationButton
                        key={pages}
                        page={pages}
                        isActive={currentPage === pages}
                        onClick={() => onPage?.(pages)}
                    />
                );
            }
        }

        return paginationItems;
    };

    return <div className="relative">
        <div className="relative overflow-auto rounded-t-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-blue text-nowrap font-semibold">
                    <tr>
                        {
                            columns.map((column) => (
                                <th key={column.title} scope="col" className="px-6 py-3 font-medium first:rounded-tl-lg last:rounded-tr-lg">
                                    {column.title}
                                </th>
                            ))
                        }

                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((row) => (
                            <tr key={row.id as string} className="border-b border-gray-200 even:bg-gray-50 ">
                                {
                                    columns.map((column) =>
                                        <Fragment key={column.title}>
                                            {renderCell(column?.render?.(row[column.key]) ?? row[column.key])}
                                        </Fragment>
                                    )
                                }
                            </tr>
                        ))
                    }
                    {
                        data?.length === 0 &&
                        <tr>
                            <td colSpan={columns.length} className="text-center py-4 text-gray-500">No data available</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
        <nav className="flex items-center flex-column bg-white flex-wrap md:flex-row justify-between p-4" >
            <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold">{skip + 1}-{Math.min(skip + limit, total)}</span> of <span className="font-light text-gray-900">{total}</span></span>
            <ul className="inline-flex space-x-1 rtl:space-x-reverse text-sm h-8">
                {
                    skip > 0 &&
                    <li>
                        <a
                            onClick={onPrev}
                            className="flex cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 hover:text-gray-700">Previous</a>
                    </li>
                }
                {renderPagination()}
                {
                    skip + limit < total &&
                    <li>
                        <a
                            onClick={onNext}
                            className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border shadow border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">Next</a>
                    </li>
                }
            </ul>
        </nav>
    </div>


}

interface PaginationButtonProps {
    page: number | string;
    isActive: boolean;
    onClick: () => void;
}

const PaginationButton: FC<PaginationButtonProps> = ({ page, isActive, onClick }) => {
    return (
        <li>
            <a
                onClick={onClick}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${isActive ? 'text-gray-700 bg-gray-200' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-lg shadow cursor-pointer`}
            >
                {page}
            </a>
        </li>
    );
}