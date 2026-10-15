import { useEffect, useRef } from 'react';
import { StoreProvider } from './lib/store.jsx';
import { useHashRoute } from './lib/router.js';
import { useReveal } from './lib/hooks.js';
import { productBySlug } from './data/products.js';
import { specialtyBySlug } from './data/categories.js';
import Header from './components/Header.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Toast from './components/Toast.jsx';
import Footer from './sections/Footer.jsx';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import Product from './pages/Product.jsx';

function NotFound() {
  return (
    <div className="mx-auto max-w-page px-gutter py-24 text-center">
      <p className="label-tech text-muted">Página no encontrada</p>
      <h1 id="page-title" tabIndex={-1} className="display-1 mt-4 text-ink">Esta dirección no existe</h1>
      <p className="mt-4 text-muted">Puede que el producto ya no esté en la maqueta.</p>
      <div className="mt-8 flex justify-center gap-3">
        <a href="#inicio" className="btn-outline">Ir al inicio</a>
        <a href="#catalogo" className="btn-primary">Ver catálogo</a>
      </div>
    </div>
  );
}

function titleFor(route) {
  if (route.name === 'product') return `${productBySlug[route.slug].title} · Ferrer Salud`;
  if (route.name === 'catalog') {
    if (route.specialty) return `${specialtyBySlug[route.specialty].name} · Ferrer Salud`;
    if (route.offers) return 'Ofertas · Ferrer Salud';
    return 'Catálogo · Ferrer Salud';
  }
  return 'Ferrer Salud';
}

function Shell() {
  const route = useHashRoute();
  const key = `${route.name}:${route.slug || route.specialty || (route.offers ? 'of' : '')}`;
  const first = useRef(true);

  useReveal(key);

  useEffect(() => {
    document.title = titleFor(route);
    if (route.name === 'home' && route.section) {
      const el = document.getElementById(route.section);
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: first.current ? 'auto' : 'smooth', block: 'start' }));
      }
    } else if (!first.current) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      const h = document.getElementById('page-title');
      if (h && route.name !== 'home') h.focus({ preventScroll: true });
    }
    first.current = false;
  }, [key, route.section]);

  return (
    <>
      <Header route={route} />
      <main id="contenido" key={key} className="page-enter">
        {route.name === 'home' && <Home />}
        {route.name === 'catalog' && <Catalog route={route} />}
        {route.name === 'product' && <Product route={route} />}
        {route.name === 'notfound' && <NotFound />}
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
