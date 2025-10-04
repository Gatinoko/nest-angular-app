import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../server/dist/models/order.model';
import { CreateOrderDto } from '../../server/dist/dto/create-order.dto';
import { UpdateOrderDto } from '../../server/dist/dto/update-order.dto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/orders';

  /**
   * Creates a new order.
   * @param dto Data for the new order (including userId and totalAmount).
   */
  createOrder(dto: CreateOrderDto): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, dto);
  }

  /**
   * Retrieves a list of all orders.
   */
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  /**
   * Retrieves a single order by ID.
   * @param id The ID of the order to fetch.
   */
  getOrderById(id: number): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url);
  }

  /**
   * Retrieves all orders placed by a specific user.
   * Assumes a NestJS endpoint like GET /orders/user/:userId
   * @param userId The ID of the user.
   */
  getOrdersByUserId(userId: number): Observable<Order[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<Order[]>(url);
  }

  /**
   * Updates an existing order.
   * @param id The ID of the order to update.
   * @param changes Fields to be updated.
   */
  updateOrder(id: number, changes: UpdateOrderDto): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Order>(url, changes); // PATCH is typically used for partial updates
  }

  /**
   * Deletes an order by ID.
   * @param id The ID of the order to delete.
   */
  deleteOrder(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
