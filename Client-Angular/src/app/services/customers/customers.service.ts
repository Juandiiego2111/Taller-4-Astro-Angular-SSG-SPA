import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Customer } from '../../interfaces/customers.interface';
import { CUSTOMERS } from '../../data/customers.interface';
import { MockDataService } from '../../mock-data/mock-data.service';

/**
 * Servicio encargado de la gestión de clientes.
 *
 * Proporciona métodos para obtener información de clientes
 * desde la data local.
 *
 * @example
 * ```ts
 * constructor(private customersService: CustomersService) {}
 *
 * this.customersService.getAllCustomers().subscribe(customers => {
 *   console.log(customers);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private readonly mockData: MockDataService) {}

  /**
   * Obtiene una lista de clientes desde la data local.
   *
   * @returns Observable que emite un array de clientes.
   *
   * @example
   * ```ts
   * this.customersService.getAllCustomers().subscribe(customers => {
   *   console.log(customers);
   * });
   * ```
   */
  getAllCustomers(): Observable<Customer[]> {
    const customers = environment.useMockData ? this.mockData.getCustomers() : CUSTOMERS;
    return of(customers);
  }
}
