import { Route, Routes } from 'react-router';

// style
import './App.css';

// layout
import Layout from 'layout';
// pages
import UsersPage from 'pages/UsersPage';
import ProductsPage from 'pages/ProductsPage';

// App component is the root component of the application
// It renders the Layout component and the HomePage component
const App = () => {
  return (
    <Routes>
      <Route element={<Layout />} path='/'>
        <Route index element={<UsersPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
