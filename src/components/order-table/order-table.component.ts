import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-order-table',
  imports: [],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTableComponent { }
