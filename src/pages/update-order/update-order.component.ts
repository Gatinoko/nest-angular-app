import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UpdateOrderFormComponent } from '../../components/update-order-form/update-order-form.component';

@Component({
  selector: 'app-update-order',
  imports: [UpdateOrderFormComponent],
  templateUrl: './update-order.component.html',
  styleUrl: './update-order.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateOrderComponent {}
