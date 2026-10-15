// Arma la página publicable: CSS y JS de la app en línea, React desde cdnjs,
// portada prerenderizada dentro de #root y las imágenes como archivos de apoyo.
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'artifact');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const css = readFileSync(resolve(root, 'dist/app.css'), 'utf8');
const js = readFileSync(resolve(root, 'dist/app.js'), 'utf8');
const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);
const ssr = render();

const FONTS =
  'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..700&family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..500&display=swap';
const REACT = 'https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js';
const REACT_DOM = 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js';

const head = `<title>Ferrer Salud</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="Maqueta navegable de la renovación del sitio de Ferrer Salud: insumos y equipamiento para odontología, laboratorio dental, medicina, podología y ortopedia en Mendoza.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="preload" as="image" href="assets/p/26327_5731.webp">
<style>${css}</style>`;

const body = `<div id="root">${ssr}</div>
<script src="${REACT}"></script>
<script src="${REACT_DOM}"></script>
<script>${js.replace(/<\/script/gi, '<\\/script')}</script>`;

// Página para publicar (el visor agrega doctype, head y body).
writeFileSync(resolve(out, 'index.html'), `${head}\n${body}\n`);

// Copia local completa para revisar con un navegador y para hosting en dist/
const skeleton = `<!doctype html><html lang="es-AR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}body{margin:0;font:14px system-ui}img{max-width:100%}[hidden]{display:none!important}</style>
${head}</head><body>${body}</body></html>`;
writeFileSync(resolve(out, 'preview.html'), skeleton);
writeFileSync(resolve(root, 'dist/index.html'), skeleton);

cpSync(resolve(root, 'public/assets'), resolve(out, 'assets'), { recursive: true });

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(1);
console.log(`index.html ${kb(head + body)} KB · css ${kb(css)} KB · js ${kb(js)} KB · ssr ${kb(ssr)} KB`);
