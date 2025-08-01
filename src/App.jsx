
// src/App.jsx
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import router from './router';
import store from './store';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
