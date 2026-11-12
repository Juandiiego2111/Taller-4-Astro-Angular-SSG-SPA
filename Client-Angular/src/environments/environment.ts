/**
 * Configuración de variables de entorno de la aplicación.
 *
 * @remarks
 * Este archivo contiene las constantes de entorno utilizadas
 * en la aplicación Angular. Se reemplaza automáticamente
 * según el entorno (development, production, ghpages, etc.)
 * durante el proceso de build.
 *
 * @example
 * ```ts
 * import { environment } from '@environments/environment';
 *
 * this.http.get(`${environment.baseUrl}/users`);
 * ```
 */
export const environment = {
  /**
   * URL base del backend de la aplicación.
   *
   * @remarks
   * Se utiliza como punto de partida para construir
   * las peticiones HTTP hacia la API.
   *
   * @example
   * ```ts
   * `${environment.baseUrl}/users`
   * ```
   */
  baseUrl: 'http://localhost:3000',

  /**
   * Indica si los servicios deben usar el almacén de datos de ejemplo
   * en memoria en lugar de la fuente de datos local por defecto.
   *
   * @default false
   */
  useMockData: false,

  /**
   * Indica si el router debe usar `HashLocationStrategy`.
   *
   * @remarks
   * Se activa únicamente en la configuración de GitHub Pages para que
   * las rutas funcionen sin reescrituras del servidor.
   *
   * @default false
   */
  useHashLocation: false,
};
