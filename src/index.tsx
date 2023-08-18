import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';

const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryclient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider>
);
