# CINESTRO 2026

Interfaz cinematográfica del festival CINESTRO, desarrollada con React, Next.js y Vinext.

## Secciones

- Portada cinematográfica con video de demostración.
- Catálogo horizontal de avances, inspirado en una plataforma de streaming.
- Filtros para selección general, obras premiadas y menciones.
- Fichas con reproductor de video y distintivos de primero, segundo y tercer lugar.
- Presentación del festival con la imagen de referencia proporcionada.
- Palmarés y convocatoria preparados para recibir información definitiva.

## Contenido provisional

Los títulos, descripciones, sedes, fechas e imágenes de participantes todavía no están definidos. La interfaz utiliza marcadores como `INSERTAR TEXTO`, `INSERTAR TÍTULO`, `INSERTAR IMAGEN` e `INSERTAR FECHA` para evitar presentar información no confirmada.

El video y las imágenes externas son materiales temporales de demostración; deben sustituirse por los avances y fotografías oficiales cuando estén disponibles.

## Desarrollo

Requiere Node.js 22.13.0 o una versión posterior.

```bash
npm install
npm run dev
```

Para generar y revisar una versión de producción:

```bash
npm run build
npm test
```

Los componentes principales están en `app/page.tsx`, los estilos en `app/globals.css` y los recursos visuales en `public/`.
