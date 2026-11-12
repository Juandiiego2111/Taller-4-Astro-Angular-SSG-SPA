# Taller 4 · Astro SSG + Angular SPA

Monorepo académico del curso de Ingeniería de Software de la UCEVA. El taller compara dos estrategias de construcción de interfaces web y las publica juntas en GitHub Pages:

- **Astro SSG** genera un sitio estático en la raíz del repositorio.
- **Angular 20** construye una SPA que se publica bajo la subruta `/client/`.

## Demo

| Aplicación | URL |
| --- | --- |
| Astro (sitio estático) | <https://juandiiego2111.github.io/Taller-4-Astro-Angular-SSG-SPA/> |
| Angular (SPA) | <https://juandiiego2111.github.io/Taller-4-Astro-Angular-SSG-SPA/client/> |

> La demo de Angular usa datos de ejemplo porque GitHub Pages solo sirve archivos estáticos y no ejecuta backends. En la demo, las rutas de Angular usan `HashLocationStrategy` (`/client/#/users`) para que funcionen al recargar sin configurar reescrituras en el servidor.

## Estructura del monorepo

```text
Taller-4-Astro-Angular-SSG-SPA/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Pruebas, build, artifact, deploy y verificación
├── Astro-SSG/
│   ├── astro.config.mjs            # site + base para GitHub Pages
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/shared/      # NavBar, NavLink, Badge, Icon
│   │   ├── data/                   # Datos locales de usuarios, productos, etc.
│   │   ├── interfaces/
│   │   ├── layouts/MainLayout.astro
│   │   ├── pages/                  # index, users, products, categories, ...
│   │   ├── styles/global.css
│   │   └── utils/base.ts           # Helper que antepone import.meta.env.BASE_URL
│   ├── package.json
│   └── package-lock.json
├── Client-Angular/
│   ├── angular.json                # Configuración de build `ghpages`
│   ├── jest.config.js
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/         # Tablas y alertas
│   │   │   ├── data/               # Datos base usados por los servicios
│   │   │   ├── interceptors/       # Interceptor HTTP para futuras integraciones
│   │   │   ├── interfaces/         # Modelos compartidos
│   │   │   ├── mock-data/          # Almacén en memoria del modo de ejemplo
│   │   │   ├── mocks/              # Datos de prueba de Jest
│   │   │   ├── pages/              # categories, customers, orders, products, users, date
│   │   │   ├── services/           # Servicios de cada entidad
│   │   │   ├── app.config.ts       # Providers; hash routing solo en ghpages
│   │   │   └── app.routes.ts
│   │   └── environments/
│   │       ├── environment.ts            # Desarrollo/local: useMockData=false
│   │       └── environment.ghpages.ts    # GitHub Pages: useMockData=true
│   ├── package.json
│   └── package-lock.json
└── README.md
```

## Tecnologías

- **Astro 5.16.9** con salida estática (SSG), TypeScript, Bootstrap 5 y Bootstrap Icons.
- **Angular 20.3.14** con componentes standalone, Angular Router, RxJS y el paquete `@brejcha13320/design-system-bootstrap`.
- **Jest 30** con `jest-preset-angular` para las pruebas unitarias del cliente.
- **GitHub Actions** y **GitHub Pages** para el despliegue conjunto.

## Autores

Según el historial de commits del repositorio:

- **David Mora Duque** — autor del repositorio original ([@INGDavidMora2005](https://github.com/INGDavidMora2005)).
- **Jesús David Mejía Vergara**.
- **Juan Diego Rodríguez Ortiz** — despliegue de esta versión en su portafolio ([@Juandiiego2111](https://github.com/Juandiiego2111)).
- **Juan Pablo Devia**.

## Ejecutar en local

### Astro SSG

```powershell
cd Astro-SSG
npm ci
npm run dev
```

La configuración define la base `/Taller-4-Astro-Angular-SSG-SPA`, por lo que el servidor de desarrollo queda disponible en:

```text
http://localhost:4321/Taller-4-Astro-Angular-SSG-SPA/
```

Comandos disponibles:

| Comando | Acción |
| --- | --- |
| `npm install` / `npm ci` | Instala las dependencias |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el sitio estático en `./dist/` |
| `npm run preview` | Previsualiza el build local |
| `npm run astro ...` | Ejecuta comandos del CLI de Astro |

Todos los enlaces internos y las rutas de assets del proyecto usan el helper `withBase()` de `Astro-SSG/src/utils/base.ts`, que antepone `import.meta.env.BASE_URL`. Así funcionan tanto en la raíz de un dominio como en un subdirectorio de GitHub Pages.

### Cliente Angular

```powershell
cd Client-Angular
npm ci
npm start
```

El cliente queda disponible en `http://localhost:4200/`.

Comandos disponibles:

| Comando | Acción |
| --- | --- |
| `npm start` | Inicia `ng serve` (modo por defecto, sin cambios) |
| `npm run build` | Build normal de Angular |
| `npm test -- --ci` | Ejecuta Jest en modo CI |
| `npm run test:watch` | Ejecuta Jest en modo interactivo |
| `npm run test:coverage` | Genera el reporte de cobertura |

Build de la demo para GitHub Pages:

```powershell
npm run build -- --configuration ghpages --base-href /Taller-4-Astro-Angular-SSG-SPA/client/
```

La salida queda en `dist/ghpages/browser/`.

## Pruebas

### Angular

```powershell
cd Client-Angular
npm test -- --ci
```

Las pruebas incluyen servicios, componentes, páginas, interceptor y el nuevo almacén de datos de ejemplo (`src/app/mock-data/`). El build de Astro no tiene un runner de pruebas: su verificación es el propio `npm run build`.

### Astro

```powershell
cd Astro-SSG
npm run build
```

El build comprueba que todas las páginas, rutas e imports se resuelvan correctamente.

## Pipeline de despliegue

El workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) se ejecuta con `push` a `master` o `main`, y también de forma manual con `workflow_dispatch`.

1. **build**
   - Configura Node.js 22 con caché de npm para los dos `package-lock.json`.
   - En `Astro-SSG`: ejecuta `npm ci` y `npm run build`.
   - En `Client-Angular`: ejecuta `npm ci`, `npm test -- --ci` y el build con la configuración `ghpages` y el `--base-href` de `/client/`.
   - Copia la salida de Angular (`Client-Angular/dist/ghpages/browser/`) dentro de `Astro-SSG/dist/client/`.
   - Sube `Astro-SSG/dist` como artifact de GitHub Pages.
2. **deploy**
   - Publica el artifact con `actions/deploy-pages` en el environment `github-pages`.
3. **verify**
   - Hace `curl` a la raíz y a `/client/` con 5 intentos y 10 segundos entre intentos.
   - Falla si alguna URL no responde `200` o si el HTML no contiene el texto esperado de cada aplicación (`Astro SSG` y `Angular Client`).

Para publicar desde un fork, en **Settings → Pages → Build and deployment** selecciona **GitHub Actions** como origen. El workflow requiere los permisos `contents: read`, `pages: write` e `id-token: write`, y usa el grupo de concurrencia `pages`.

La carpeta combinada que se publica tiene esta forma:

```text
Astro-SSG/dist/
├── index.html
├── _astro/
├── users/index.html
├── products/index.html
├── categories/index.html
├── customers/index.html
├── orders/index.html
├── current-date/index.html
└── client/                # Build de Angular
    ├── index.html
    ├── main-*.js
    ├── styles-*.css
    └── ...
```

### Datos de ejemplo y rutas en Angular

La configuración `ghpages` de `angular.json` reemplaza `environment.ts` por `environment.ghpages.ts`, que activa `useMockData: true` y `useHashLocation: true`.

- **Datos:** `MockDataService` mantiene en memoria copias de categorías, clientes, pedidos, productos y usuarios. Los servicios consultan ese almacén solo cuando `useMockData` está activo. Con el entorno por defecto (`useMockData: false`), el comportamiento original no cambia.
- **Rutas:** con hash, una URL como `/client/#/users` funciona directamente en GitHub Pages porque el servidor solo recibe la ruta estática `/client/`. En local se mantiene el enrutamiento normal por rutas.
- **Backend:** GitHub Pages no ejecuta backends, por lo que la demo no realiza peticiones HTTP. El interceptor existente se conserva para futuras integraciones con una API real.

## Conventional Commits

El repositorio usa el formato [Conventional Commits](https://www.conventionalcommits.org/):

```text
<tipo>(<alcance opcional>): <descripción breve>
```

Tipos habituales:

| Tipo | Uso |
| --- | --- |
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de un error |
| `test` | Pruebas nuevas o modificadas |
| `docs` | Documentación |
| `refactor` | Cambio interno sin alterar el comportamiento |
| `style` | Formato, espacios o estilos sin cambio lógico |
| `ci` | Cambios en el pipeline o workflows |
| `chore` | Tareas de mantenimiento |

Ejemplos:

```text
feat(astro): agrega enlace al cliente Angular en el navbar
fix(astro): corrige los enlaces internos para respetar la base de Pages
feat(client): agrega configuración ghpages con datos de ejemplo
test(client): cubre el almacén MockDataService y los servicios en modo demo
fix(client): activa hash routing solo en el build de GitHub Pages
docs: documenta el despliegue y los comandos del monorepo
ci: agrega workflow de build, deploy y verificación en Pages
```
