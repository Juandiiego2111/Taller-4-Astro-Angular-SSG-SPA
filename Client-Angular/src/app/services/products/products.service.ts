import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../../interfaces/products.interface';
import { PRODUCTS } from '../../data/products.interface';
import { MockDataService } from '../../mock-data/mock-data.service';

/**
 * Servicio encargado de la gestión de productos.
 *
 * Proporciona métodos para obtener información de productos
 * desde la data local.
 *
 * @example
 * ```ts
 * constructor(private productsService: ProductsService) {}
 *
 * this.productsService.getAllProducts(10).subscribe(products => {
 *   console.log(products);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly mockData: MockDataService) {}

  /**
   * Obtiene una lista de productos desde el backend.
   *
   * @param countProducts Número de productos a obtener.
   * @returns Observable que emite un array de productos.
   *
   * @example
   * ```ts
   * this.productsService.getAllProducts().subscribe(products => {
   *   console.log(products);
   * });
   * ```
   */
  getAllProducts(): Observable<Product[]> {
    const products = environment.useMockData ? this.mockData.getProducts() : PRODUCTS;
    return of(products);
  }
}
