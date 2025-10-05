import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreateOrderFormComponent } from '../../components/create-order-form/create-order-form.component';

@Component({
  selector: 'app-create-order',
  imports: [CreateOrderFormComponent],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrderComponent {}
