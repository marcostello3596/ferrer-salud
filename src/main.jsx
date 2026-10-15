import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { parseHash } from './lib/router.js';
import './index.css';

const root = document.getElementById('root');
const route = parseHash(window.location.hash);

// La portada llega prerenderizada: se hidrata. Para otras rutas se monta de cero.
if (root.hasChildNodes() && route.name === 'home' && !route.section) {
  hydrateRoot(root, <App />);
} else {
  root.innerHTML = '';
  createRoot(root).render(<App />);
}
