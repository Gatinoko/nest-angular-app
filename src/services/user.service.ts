import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserDto } from '../../server/dist/dto/create-user.dto';
import { User } from '../../server/dist/models/user.model';
import { LoginUserDto } from '../../server/dist/dto/login-user.dto';
import { AuthResponse } from './auth.service';

@Injectable({
  providedIn: 'root', // Makes the service a singleton and tree-shakable
})
export class UserService {
  private http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/users';

  /**
   * Registers a new user by sending a POST request to the NestJS API.
   */
  register(dto: CreateUserDto): Observable<User> {
    const { email, password, firstName, lastName } = dto;
    return this.http.post<User>(this.apiUrl, {
      email,
      password,
      firstName,
      lastName,
    });
  }

  /**
   * Retrieves a list of all users.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Retrieves a single user by their ID.
   * @param id The ID of the user to fetch.
   */
  getUserById(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url);
  }

  /**
   * Validates user email and password combination.
   * @param dto User login data transfer object.
   */
  validateUserLogin(dto: LoginUserDto): Observable<AuthResponse> {
    const url = `${this.apiUrl}/login`;
    const { email, password } = dto;
    return this.http.post<AuthResponse>(url, { email, password });
  }
}
