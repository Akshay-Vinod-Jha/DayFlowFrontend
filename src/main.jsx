import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './store/AuthContext';
import { TaskProvider } from './store/TaskContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: '0.85rem',
                border: '1px solid #e2e8f0',
                padding: '12px 14px',
              },
            }}
          />
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
