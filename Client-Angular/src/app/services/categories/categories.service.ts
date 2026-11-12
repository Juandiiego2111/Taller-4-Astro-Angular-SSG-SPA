import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from '../../interfaces/categories.interface';
import { CATEGORIES } from '../../data/categories.interface';
import { MockDataService } from '../../mock-data/mock-data.service';

/**
 * Servicio encargado de la gestión de categorías.
 *
 * Proporciona métodos para obtener información de categorías
 * desde la data local.
 *
 * @example
 * ```ts
 * constructor(private categoriesService: CategoriesService) {}
 *
 * this.categoriesService.getAllCategories().subscribe(categories => {
 *   console.log(categories);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private readonly mockData: MockDataService) {}

  /**
   * Obtiene una lista de categorías desde el backend.
   *
   * @returns Observable que emite un array de categorías.
   *
   * @example
   * ```ts
   * this.categoriesService.getAllCategories().subscribe(categories => {
   *   console.log(categories);
   * });
   * ```
   */
  getAllCategories(): Observable<Category[]> {
    const categories = environment.useMockData ? this.mockData.getCategories() : CATEGORIES;
    return of(categories);
  }
}
