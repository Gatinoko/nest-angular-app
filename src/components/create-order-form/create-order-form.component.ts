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

interface ICreateOrderForm {
  product: AbstractControl<string | null>;
  totalAmount: AbstractControl<string | null>;
  status: AbstractControl<string | null>;
}

@Component({
  selector: 'app-create-order-form',
  imports: [ReactiveFormsModule],
  templateUrl: './create-order-form.component.html',
  styleUrl: './create-order-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrderFormComponent {
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  public createOrderForm = new FormGroup<ICreateOrderForm>({
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
    return this.createOrderForm.get('product')!;
  }

  get totalAmountControl() {
    return this.createOrderForm.get('totalAmount')!;
  }

  get statusControl() {
    return this.createOrderForm.get('status')!;
  }

  /**
   * Checks if a form control should display a validation error.
   * @param controlName The name of the control.
   */
  isInvalid(controlName: string): boolean {
    const control = this.createOrderForm.get(controlName);
    // Control is invalid AND it has been interacted with (dirty or touched)
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  /**
   * Handles form submission logic.
   */
  onSubmit(): void {
    if (this.createOrderForm.valid) {
      const { product, status, totalAmount } = this.createOrderForm.value;

      this.orderService
        .createOrder({
          userId: this.authService.currentUser()?.id!,
          product: product!,
          totalAmount: Number(totalAmount!),
          status: 'pending',
        })
        .subscribe({
          next: (response) => {
            this.submissionMessage.set(
              `Order creation successful for order: ${totalAmount}, ${status}!`
            );
            this.createOrderForm.reset({
              product: '',
              totalAmount: '',
              status: 'pending',
            });
          },
          error: (err) => this.submissionMessage.set(err.message),
        });
    }

    // If invalid, mark all fields as touched to trigger error messages
    else {
      this.createOrderForm.markAllAsTouched();
      this.submissionMessage.set(null);
      console.error('Create order form validation failed.');
    }
  }
}
