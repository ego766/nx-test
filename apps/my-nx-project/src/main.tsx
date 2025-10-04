import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';

function render(el: HTMLElement | null) {
  if (!el) return;
  const root = ReactDOM.createRoot(el);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
  return () => root.unmount();
}

// Standalone mode (dev iframe for remote or direct open)
if (document.getElementById('root')) {
  render(document.getElementById('root'));
}

// Export mount/unmount for host to call when loading as remote
export { render as mount };
