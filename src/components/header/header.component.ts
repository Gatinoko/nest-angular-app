import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HeaderComponent {
  private router = inject(Router);
  public authService = inject(AuthService);

  /**
   * Calls the AuthService logout method and redirects the user.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
