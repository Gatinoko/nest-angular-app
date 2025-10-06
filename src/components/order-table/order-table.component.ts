import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../../server/dist/models/order.model';
import { DecimalPipe } from '@angular/common';
import { finalize, catchError, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-table',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTableComponent {
  private orderService = inject(OrderService);
  public authService = inject(AuthService);

  public orders: WritableSignal<Order[]> = signal([]);
  public isLoading: WritableSignal<boolean> = signal(false);
  public error: WritableSignal<string | null> = signal(null);

  ngOnInit(): void {
    this.fetchOrders();
  }

  /**
   * Fetches all orders.
   */
  fetchOrders(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.orderService
      .getOrdersByUserId(this.authService.currentUser()?.id!)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        catchError((err) => {
          console.error('Failed to fetch orders:', err);
          this.error.set(
            'Could not load orders. Please check the API connection.'
          );
          return of([]);
        })
      )
      .subscribe({
        next: (orders) => this.orders.set(orders),
      });
  }

  /**
   * Deletes an order and reloads the table data.
   */
  deleteOrder(id: number): void {
    if (!confirm(`Are you sure you want to delete Order ID ${id}?`)) return;

    this.isLoading.set(true);
    this.orderService
      .deleteOrder(id)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        catchError((err) => {
          console.error('Delete failed:', err);
          this.error.set(`Failed to delete order ID ${id}.`);
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          this.orders.update((currentOrders) =>
            currentOrders.filter((order) => order.id !== id)
          );
          this.error.set(null);
        },
      });
  }

  /**
   * Returns Tailwind CSS classes based on the order status for visual cues.
   */
  getStatusClasses(status: string): string {
    switch (status.toLowerCase()) {
      case 'fulfilled':
        return 'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800';
      case 'pending':
        return 'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800';
      default:
        return 'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800';
    }
  }
}
