/**
 * Entorno de demostración para GitHub Pages.
 *
 * @remarks
 * GitHub Pages solo publica archivos estáticos, por lo que no existe
 * el backend de `http://localhost:3000`. En este entorno la aplicación:
 * - Usa datos de ejemplo en memoria (`useMockData`).
 * - Usa rutas con hash (`useHashLocation`) para evitar 404 al recargar.
 *
 * Se activa con la configuración de build `ghpages` de `angular.json`.
 */
export const environment = {
  /** No hay backend en GitHub Pages. */
  baseUrl: '',

  /** Activa el almacén local de datos de ejemplo. */
  useMockData: true,

  /** Genera URLs como `/client/#/users`. */
  useHashLocation: true,
};
