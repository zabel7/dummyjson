import { FC } from 'react'

interface TabsProps {
    children: React.ReactNode
}

interface TabsComponent extends FC<TabsProps> {
    Tab: FC<TabProps>
}

const Tabs: TabsComponent = ({ children }) => {
    return (
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">

            {children}
        </ul>
    )
}

interface TabProps {
    active?: boolean
    children: React.ReactNode
    onClick?: () => void
}

const Tab: FC<TabProps> = ({ active = false, children, onClick }) => {
    return (
        <li className="me-2" onClick={onClick}>
            <a
                className={`inline-flex cursor-pointer gap-2 px-4 py-3 rounded-lg ${active ? 'text-black bg-yellow' : 'hover:text-gray-900 hover:bg-gray-300'}`}
            >
                {children}
            </a>
        </li>
    )
}

Tabs.Tab = Tab

export default Tabs