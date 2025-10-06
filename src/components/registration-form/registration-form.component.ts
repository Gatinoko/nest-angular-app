import { CommonModule } from '@angular/common';
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
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

interface IRegistrationForm {
  firstName: AbstractControl<string | null>;
  lastName: AbstractControl<string | null>;
  email: AbstractControl<string | null>;
  password: AbstractControl<string | null>;
  confirmPassword: AbstractControl<string | null>;
}

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  // Set error on confirmPassword control if they don't match and confirmPassword is dirty/touched
  if (password.value !== confirmPassword.value && confirmPassword.dirty) {
    confirmPassword.setErrors({ mismatch: true });
    return { mismatch: true };
  } else if (
    confirmPassword.hasError('mismatch') &&
    password.value === confirmPassword.value
  ) {
    // Clear mismatch error if values now match and there are no other errors
    const errors = { ...confirmPassword.errors };
    delete errors['mismatch'];
    confirmPassword.setErrors(Object.keys(errors).length > 0 ? errors : null);
  }

  return null;
};

@Component({
  selector: 'app-registration-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  public registrationForm = new FormGroup<IRegistrationForm>(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    passwordMatchValidator
  );
  public submissionMessage = signal<string | null>(null);

  get firstNameControl() {
    return this.registrationForm.get('firstName')!;
  }

  get lastNameControl() {
    return this.registrationForm.get('lastName')!;
  }

  get emailControl() {
    return this.registrationForm.get('email')!;
  }

  get passwordControl() {
    return this.registrationForm.get('password')!;
  }

  get confirmPasswordControl() {
    return this.registrationForm.get('confirmPassword')!;
  }

  /**
   * Checks if a form control should display a validation error.
   * @param controlName The name of the control.
   */
  isInvalid(controlName: string): boolean {
    const control = this.registrationForm.get(controlName);
    // Control is invalid AND it has been interacted with (dirty or touched)
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  /**
   * Handles form submission logic.
   */
  onSubmit(): void {
    if (this.registrationForm.valid) {
      const { email, firstName, lastName, password } =
        this.registrationForm.value;

      this.userService
        .register({
          email: email!,
          firstName: firstName!,
          lastName: lastName!,
          password: password!,
        })
        .subscribe({
          next: (response) => {
            console.log(response);
            console.log('User registered:', response.email);
            this.submissionMessage.set(
              `Registration successful for email: ${email!}!`
            );
            this.registrationForm.reset();

            // Redirect user to login after 1 second
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            console.error('Registration failed:', err.error);
            this.submissionMessage.set(err.error.message);
          },
        });

      console.log('Registering user with data:', {
        email: email,
        password: password,
      });

      this.submissionMessage.set(
        `Registration successful for email: ${email}!`
      );

      // Reset the form state
      this.registrationForm.reset();
    } else {
      // If invalid, mark all fields as touched to trigger error messages
      this.registrationForm.markAllAsTouched();
      this.submissionMessage.set(null);
      console.error('Registration form validation failed.');
    }
  }
}
