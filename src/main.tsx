import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { setupStore } from './store';
import { Provider } from 'react-redux';
import App from './App.jsx';

const store = setupStore();

// Render the App component inside the BrowserRouter
// and wrap it with the Routes and Route components
// to enable routing in the application
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
