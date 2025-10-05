import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderTableComponent } from '../../components/order-table/order-table.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [OrderTableComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
