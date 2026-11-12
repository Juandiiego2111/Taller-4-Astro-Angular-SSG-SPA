import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../interfaces/users.interface';
import { USERS } from '../../data/users.interface';
import { MockDataService } from '../../mock-data/mock-data.service';

/**
 * Servicio encargado de la gestión de usuarios.
 *
 * Proporciona métodos para obtener información de usuarios
 * desde el data local.
 *
 * @example
 * ```ts
 * constructor(private usersService: UsersService) {}
 *
 * this.usersService.getAllUsers().subscribe(users => {
 *   console.log(users);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly mockData: MockDataService) {}

  /**
   * Obtiene una lista de usuarios desde el backend.
   *
   * @returns Observable que emite un array de usuarios.
   *
   * @example
   * ```ts
   * this.usersService.getAllUsers(5).subscribe(users => {
   *   console.log(users);
   * });
   * ```
   */
  getAllUsers(): Observable<User[]> {
    const users = environment.useMockData ? this.mockData.getUsers() : USERS;
    return of(users);
  }
}
