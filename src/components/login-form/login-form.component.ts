import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

interface ILoginForm {
  email: AbstractControl<string | null>;
  password: AbstractControl<string | null>;
}

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  private authService = inject(AuthService);

  loginForm = new FormGroup<ILoginForm>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  submissionMessage = signal<string | null>(null);

  get emailControl() {
    return this.loginForm.get('email')!;
  }

  get passwordControl() {
    return this.loginForm.get('password')!;
  }

  /**
   * Checks if a form control should display a validation error.
   * @param controlName The name of the control.
   */
  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);

    // Control is invalid AND it has been interacted with (dirty or touched)
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  /**
   * Handles form submission logic.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login({ email: email!, password: password! }).subscribe({
        next: (response) => {
          console.log('User logged in:', response.user);
          this.submissionMessage.set(`Login successful for email: ${email!}!`);
          this.loginForm.reset();
        },
        error: (err) => {
          console.error('Login failed:', err.message);
          this.submissionMessage.set(err.message);
        },
      });
    }

    // If invalid, mark all fields as touched to trigger error messages
    else {
      this.loginForm.markAllAsTouched();
      this.submissionMessage.set(null);
      console.error('Login form validation failed.');
    }
  }
}
