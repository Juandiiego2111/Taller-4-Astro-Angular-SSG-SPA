import { Injectable } from '@angular/core';
import { CATEGORIES } from '../data/categories.interface';
import { CUSTOMERS } from '../data/customers.interface';
import { ORDERS } from '../data/orders.interface';
import { PRODUCTS } from '../data/products.interface';
import { USERS } from '../data/users.interface';
import { Category } from '../interfaces/categories.interface';
import { Customer } from '../interfaces/customers.interface';
import { Order } from '../interfaces/orders.interface';
import { Product } from '../interfaces/products.interface';
import { User } from '../interfaces/users.interface';

/**
 * Almacén de datos de ejemplo en memoria para la demo de GitHub Pages.
 *
 * @remarks
 * Mantiene copias propias de las cinco colecciones de la aplicación.
 * Cada lectura devuelve copias de los objetos para que los componentes
 * no modifiquen el estado interno del almacén.
 *
 * Solo se utiliza cuando `environment.useMockData` es `true`, es decir,
 * en la configuración de build `ghpages`. El modo por defecto conserva
 * el comportamiento original de los servicios.
 */
@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private readonly categories: Category[] = this.clone(CATEGORIES);
  private readonly customers: Customer[] = this.clone(CUSTOMERS);
  private readonly orders: Order[] = this.clone(ORDERS);
  private readonly products: Product[] = this.clone(PRODUCTS);
  private readonly users: User[] = this.clone(USERS);

  /** Devuelve las categorías almacenadas en memoria. */
  getCategories(): Category[] {
    return this.clone(this.categories);
  }

  /** Devuelve los clientes almacenados en memoria. */
  getCustomers(): Customer[] {
    return this.clone(this.customers);
  }

  /** Devuelve los pedidos almacenados en memoria. */
  getOrders(): Order[] {
    return this.clone(this.orders);
  }

  /** Devuelve los productos almacenados en memoria. */
  getProducts(): Product[] {
    return this.clone(this.products);
  }

  /** Devuelve los usuarios almacenados en memoria. */
  getUsers(): User[] {
    return this.clone(this.users);
  }

  /**
   * Crea una copia superficial de cada elemento para aislar el estado
   * del almacén de los cambios realizados por los consumidores.
   */
  private clone<T extends object>(items: T[]): T[] {
    return items.map((item) => ({ ...item }));
  }
}
