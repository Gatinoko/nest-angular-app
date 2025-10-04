import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreateOrderFormComponent } from '../../components/create-order-form/create-order-form.component';

@Component({
  selector: 'app-dashboard',
  imports: [CreateOrderFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
