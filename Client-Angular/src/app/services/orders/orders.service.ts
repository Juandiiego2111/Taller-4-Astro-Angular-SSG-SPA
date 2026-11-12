import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order } from '../../interfaces/orders.interface';
import { ORDERS } from '../../data/orders.interface';
import { MockDataService } from '../../mock-data/mock-data.service';

/**
 * Servicio encargado de la gestión de pedidos.
 *
 * Proporciona métodos para obtener información de pedidos
 * desde la data local.
 *
 * @example
 * ```ts
 * constructor(private ordersService: OrdersService) {}
 *
 * this.ordersService.getAllOrders().subscribe(orders => {
 *   console.log(orders);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private readonly mockData: MockDataService) {}

  /**
   * Obtiene una lista de pedidos desde la data local.
   *
   * @returns Observable que emite un array de pedidos.
   *
   * @example
   * ```ts
   * this.ordersService.getAllOrders().subscribe(orders => {
   *   console.log(orders);
   * });
   * ```
   */
  getAllOrders(): Observable<Order[]> {
    const orders = environment.useMockData ? this.mockData.getOrders() : ORDERS;
    return of(orders);
  }
}
