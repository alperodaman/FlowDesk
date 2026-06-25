import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

async function enableMocking() {
  if (!import.meta.env.DEV || !import.meta.env.VITE_ENABLE_MSW) {
    return;
  }

  const { worker } = await import('../tests/mocks/browser');
  await worker.start({
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
