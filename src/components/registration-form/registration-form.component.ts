import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

// Ensures 'password' and 'confirmPassword' fields match
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  console.log('validator');
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
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  constructor(private fb: FormBuilder) {}

  registrationForm!: FormGroup;
  submissionMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }

  // Convenience getters for accessing controls in the template
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
    console.log('form submit');
    console.log(this.registrationForm);

    if (this.registrationForm.valid) {
      const { email, password } = this.registrationForm.value;

      // LOGIC TO CALL NESTJS SERVICE/API HERE (e.g., this.userService.register({email, password}))
      console.log('Registering user with data:', { email, password });

      this.submissionMessage.set(
        `Registration successful for email: ${email}!`
      );

      // Reset the form state
      this.registrationForm.reset();
    } else {
      // If invalid, mark all fields as touched to trigger error messages
      this.registrationForm.markAllAsTouched();
      this.submissionMessage.set(null);
      console.error('Form validation failed.');
    }
  }
}
