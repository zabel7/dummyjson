import { FC, ReactNode } from 'react'

interface CardProps {
    children: ReactNode
}

export const Card: FC<CardProps> = ({ children }) => {
    return (
        <div className='bg-white shadow-md rounded-xl overflow-auto  p-4'>
            {children}
        </div>
    )
}