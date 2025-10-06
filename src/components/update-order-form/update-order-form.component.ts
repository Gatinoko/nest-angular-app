import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Order } from '../../../server/dist/models/order.model';
import { of } from 'rxjs';

interface IUpdateOrderForm {
  product: AbstractControl<string | null>;
  totalAmount: AbstractControl<string | null>;
  status: AbstractControl<string | null>;
}

@Component({
  selector: 'app-update-order-form',
  imports: [ReactiveFormsModule],
  templateUrl: './update-order-form.component.html',
  styleUrl: './update-order-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateOrderFormComponent {
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);
  public router = inject(Router);

  public orderId = signal<number | null>(null);
  public orderData = signal<Order | null>(null);
  public isLoading = signal(true);
  public error = signal<string | null>(null);

  public updateOrderForm = new FormGroup<IUpdateOrderForm>({
    product: new FormControl('', [Validators.required]),
    totalAmount: new FormControl('', [Validators.required]),
    status: new FormControl({ value: 'pending', disabled: true }, [
      Validators.required,
    ]),
  });
  public submissionMessage = signal<string | null>(null);
  public statusOptions = [
    {
      id: 1,
      text: 'Pending',
      value: 'pending',
    },
    {
      id: 2,
      text: 'Approved',
      value: 'approved',
    },
    {
      id: 3,
      text: 'Fulfilled',
      value: 'fulfilled',
    },
  ];

  get productControl() {
    return this.updateOrderForm.get('product')!;
  }

  get totalAmountControl() {
    return this.updateOrderForm.get('totalAmount')!;
  }

  get statusControl() {
    return this.updateOrderForm.get('status')!;
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        // 1. Get the 'id' parameter from the URL map
        switchMap((params) => {
          const idString = params.get('id');
          const id = idString ? parseInt(idString, 10) : null;

          if (!id || isNaN(id)) {
            this.error.set('Invalid order ID provided in the URL.');
            this.isLoading.set(false);
            return of(null); // Stop the stream
          }

          this.orderId.set(id);
          this.isLoading.set(true);
          this.error.set(null);

          // 2. Use the ID to call the service method
          return this.orderService.getOrderById(id);
        })
      )
      .subscribe({
        next: (order) => {
          this.orderData.set(order);
          this.isLoading.set(false);

          if (order) {
            // Populates the form
            this.updateOrderForm.patchValue({
              product: order.product,
              totalAmount: order.totalAmount.toString(),
              status: order.status,
            });

            // Mark the form as pristine/untouched after loading data
            this.updateOrderForm.markAsPristine();
          }
        },
        error: (err) => {
          console.error('Error fetching order:', err);
          this.error.set('Failed to fetch order details. It may not exist.');
          this.isLoading.set(false);
        },
      });
  }

  /**
   * Checks if a form control should display a validation error.
   * @param controlName The name of the control.
   */
  isInvalid(controlName: string): boolean {
    const control = this.updateOrderForm.get(controlName);

    // Control is invalid AND it has been interacted with (dirty or touched)
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  /**
   * Handles form submission logic.
   */
  onSubmit(): void {
    if (this.updateOrderForm.valid) {
      const { product, totalAmount } = this.updateOrderForm.value;

      this.orderService
        .updateOrder(this.orderId()!, {
          product: product!,
          totalAmount: Number(totalAmount!),
          status: 'pending',
        })
        .subscribe({
          next: (response) => {
            this.submissionMessage.set(`Order edit successful!`);
          },
          error: (err) => this.submissionMessage.set(err.message),
        });
    }

    // If invalid, mark all fields as touched to trigger error messages
    else {
      this.updateOrderForm.markAllAsTouched();
      this.submissionMessage.set(null);
      console.error('Create order form validation failed.');
    }
  }
}
