import { FC } from 'react';

interface LoaderProps {
    loading: boolean;
    children: React.ReactNode;
}

export const Loader: FC<LoaderProps> = ({ loading, children }) => {
    if (loading) {
        return (
            <div className="flex flex-1 h-full items-center justify-center m-auto">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2  border-gray-900" />
            </div>
        );
    }

    return children;
};
