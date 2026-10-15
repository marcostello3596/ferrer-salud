# Ferrer Salud — maqueta de renovación

Concepto: **Precisión que cuida**. Catálogo profesional + diseño editorial + fotografía de producto.

## Cómo correrla

```bash
npm install
npm run dev      # desarrollo
npm run build    # genera artifact/index.html (portada prerenderizada) y artifact/assets/
```

React 18 se carga desde cdnjs; Tailwind se compila en el build. `artifact/preview.html` es una copia completa para abrir con cualquier servidor estático.

## Dónde están los datos (para reemplazarlos)

| Archivo | Contenido |
|---|---|
| `src/data/site.js` | Datos del negocio (dirección, WhatsApp, email, horarios, avisos legales) y URL pública |
| `src/data/categories.js` | Especialidades, códigos (ODO, LAB, MED, POD, ORT) y familias |
| `src/data/products.js` | 12 productos con fotos, precios, ofertas, especificaciones y procedencia de cada dato |
| `src/data/brands.js` | Marcas y franja de logos |

Cada producto tiene un campo `provenance` que indica si el dato viene del catálogo actual (`catalogo`), del banner de ofertas (`banner`), si se calculó (`derivado`) o si es texto de muestra (`muestra`).

## Contenido de muestra

- Precios y stock: referencia relevada en ferrersalud.org el 15/10/2026, redondeados al peso.
- Disponibilidad: derivada del stock relevado (7 unidades o menos = "Últimas unidades").
- Descripciones redactadas para la maqueta: guantes Trux y alicate Germania (marcadas en la ficha).
- La agrupación por especialidad es una propuesta de navegación.
- Logos de marcas: siluetas monocromas de los logos oficiales; validar uso con cada marca.

## Rutas

`#inicio` · `#catalogo` · `#catalogo-<especialidad>` · `#catalogo-ofertas` · `#p-<producto>`
