import { Outlet, useNavigate, useLocation } from 'react-router';
import { ListBulletIcon, UserCircleIcon } from '@heroicons/react/20/solid';

import Header from 'layout/Header';
// UI
import Tabs from 'UI/Tabs';

// Layout component
// It renders the Navigation and the main content of the
// as children components. It responsible for the overall
// layout of the application
const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="w-screen h-screen bg-color-blue">
            <Header />
            <main className="px-4 pb-6 pt-[5rem] flex-1 w-full h-full space-y-4">


                <Tabs>
                    <Tabs.Tab
                        onClick={() => navigate('/users')}
                        active={['/', '/users'].includes(location.pathname)}
                    >
                        <UserCircleIcon className="w-5 h-5" />
                        Users
                    </Tabs.Tab>
                    <Tabs.Tab
                        onClick={() => navigate('/products')}
                        active={location.pathname === '/products'}
                    >
                        <ListBulletIcon className="w-5 h-5" />
                        Products
                    </Tabs.Tab>
                </Tabs>



                <Outlet />
            </main>
        </div>
    );
};


export default Layout;
