/**
 * Utilidades para construir rutas internas compatibles con la opción `base`
 * de Astro (por ejemplo, al desplegar en un subdirectorio de GitHub Pages).
 */

/**
 * Base del sitio sin barra final (cadena vacía cuando el sitio se sirve en la raíz).
 */
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * Antepone la base del sitio a una ruta interna.
 *
 * @param path Ruta interna que empieza por `/` (por ejemplo, `/users`).
 *             Si se omite, devuelve la raíz del sitio.
 * @returns Ruta lista para usarse en `href` o `src`.
 *
 * @example
 * ```ts
 * withBase('/users'); // '/Taller-4-Astro-Angular-SSG-SPA/users'
 * ```
 */
export function withBase(path = ''): string {
  if (!path) {
    return `${basePath}/`;
  }

  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
}
