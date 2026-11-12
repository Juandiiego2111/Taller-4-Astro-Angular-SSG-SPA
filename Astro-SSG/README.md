# Astro SSG · Taller 4

Aplicación estática del monorepo, construida con **Astro 5.16.9**. Genera las vistas de usuarios, productos, categorías, clientes, pedidos y fecha actual a partir de datos locales en `src/data/`.

La documentación completa del taller, el despliegue y la app Angular están en el [README raíz](../README.md).

## Comandos

| Comando | Acción |
| --- | --- |
| `npm install` / `npm ci` | Instala las dependencias |
| `npm run dev` | Inicia el servidor de desarrollo en `http://localhost:4321/Taller-4-Astro-Angular-SSG-SPA/` |
| `npm run build` | Genera el sitio estático en `./dist/` |
| `npm run preview` | Previsualiza el build local |
| `npm run astro ...` | Ejecuta comandos del CLI de Astro |

## Estructura

```text
src/
├── assets/
├── components/shared/   # NavBar, NavLink, Badge e Icon
├── data/                # Datos locales de cada entidad
├── interfaces/          # Tipos de TypeScript
├── layouts/             # MainLayout.astro
├── pages/               # Rutas del sitio
├── styles/              # Estilos globales
└── utils/base.ts        # Helper para respetar import.meta.env.BASE_URL
```

## Despliegue

`astro.config.mjs` define:

```js
site: 'https://juandiiego2111.github.io',
base: '/Taller-4-Astro-Angular-SSG-SPA',
```

Los enlaces internos y las rutas de assets usan `withBase()` para funcionar bajo el subdirectorio de GitHub Pages. El workflow del repositorio copia el build de Angular dentro de `dist/client/` antes de publicar.
