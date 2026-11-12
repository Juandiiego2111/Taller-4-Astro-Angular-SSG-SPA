import { TestBed } from '@angular/core/testing';
import { CATEGORIES } from '../data/categories.interface';
import { CUSTOMERS } from '../data/customers.interface';
import { ORDERS } from '../data/orders.interface';
import { PRODUCTS } from '../data/products.interface';
import { USERS } from '../data/users.interface';
import { MockDataService } from './mock-data.service';

describe('MockDataService', () => {
  let service: MockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockDataService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería exponer las categorías de ejemplo', () => {
    expect(service.getCategories()).toEqual(CATEGORIES);
  });

  it('debería exponer los clientes de ejemplo', () => {
    expect(service.getCustomers()).toEqual(CUSTOMERS);
  });

  it('debería exponer los pedidos de ejemplo', () => {
    expect(service.getOrders()).toEqual(ORDERS);
  });

  it('debería exponer los productos de ejemplo', () => {
    expect(service.getProducts()).toEqual(PRODUCTS);
  });

  it('debería exponer los usuarios de ejemplo', () => {
    expect(service.getUsers()).toEqual(USERS);
  });

  it('debería devolver copias para no alterar el estado en memoria', () => {
    const firstRead = service.getUsers();
    firstRead[0].name = 'Nombre modificado';

    expect(service.getUsers()[0].name).toBe(USERS[0].name);
  });
});
