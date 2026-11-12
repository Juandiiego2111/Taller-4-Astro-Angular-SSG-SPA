import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { CATEGORIES } from '../data/categories.interface';
import { CUSTOMERS } from '../data/customers.interface';
import { ORDERS } from '../data/orders.interface';
import { PRODUCTS } from '../data/products.interface';
import { USERS } from '../data/users.interface';
import { environment } from '../../environments/environment';
import { CategoriesService } from '../services/categories/categories.service';
import { CustomersService } from '../services/customers/customers.service';
import { OrdersService } from '../services/orders/orders.service';
import { ProductsService } from '../services/products/products.service';
import { UsersService } from '../services/users/users.service';

/**
 * Verifica que los cinco servicios usen el almacén en memoria cuando
 * `environment.useMockData` está activo (configuración `ghpages`).
 */
describe('Servicios con datos de ejemplo', () => {
  let useMockDataOriginal: boolean;

  beforeEach(() => {
    useMockDataOriginal = environment.useMockData;
    environment.useMockData = true;
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    environment.useMockData = useMockDataOriginal;
  });

  it('CategoriesService debería leer del almacén en memoria', async () => {
    const categories = await firstValueFrom(TestBed.inject(CategoriesService).getAllCategories());

    expect(categories).toEqual(CATEGORIES);
    expect(categories).not.toBe(CATEGORIES);
  });

  it('CustomersService debería leer del almacén en memoria', async () => {
    const customers = await firstValueFrom(TestBed.inject(CustomersService).getAllCustomers());

    expect(customers).toEqual(CUSTOMERS);
    expect(customers).not.toBe(CUSTOMERS);
  });

  it('OrdersService debería leer del almacén en memoria', async () => {
    const orders = await firstValueFrom(TestBed.inject(OrdersService).getAllOrders());

    expect(orders).toEqual(ORDERS);
    expect(orders).not.toBe(ORDERS);
  });

  it('ProductsService debería leer del almacén en memoria', async () => {
    const products = await firstValueFrom(TestBed.inject(ProductsService).getAllProducts());

    expect(products).toEqual(PRODUCTS);
    expect(products).not.toBe(PRODUCTS);
  });

  it('UsersService debería leer del almacén en memoria', async () => {
    const users = await firstValueFrom(TestBed.inject(UsersService).getAllUsers());

    expect(users).toEqual(USERS);
    expect(users).not.toBe(USERS);
  });
});
