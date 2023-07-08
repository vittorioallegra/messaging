import { createRoot } from 'react-dom/client';

import { App } from './app/App';
import { AuthProvider } from './app/contexts';

const container = document.getElementById('root');
if (!container) {
  throw new Error('No container found');
}
const root = createRoot(container);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
