import { renderToString } from 'react-dom/server';
import App from './App.jsx';

// Prerender de la portada: el primer cuadro se ve completo antes de que cargue JavaScript.
export function render() {
  return renderToString(<App />);
}
