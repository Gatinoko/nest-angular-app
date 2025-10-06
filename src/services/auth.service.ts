import {
  Injectable,
  WritableSignal,
  signal,
  computed,
  effect,
  inject,
} from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../../server/dist/models/user.model';
import { LoginUserDto } from '../../server/dist/dto/login-user.dto';
import { UserService } from './user.service';

export interface AuthResponse {
  accessToken: string;
  user: Partial<User>;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userService = inject(UserService);

  private currentUserSig: WritableSignal<Partial<User> | null> =
    signal<Partial<User> | null>(null);
  private accessTokenSig: WritableSignal<string | null> = signal<string | null>(
    null
  );

  public isLoggedIn = computed(
    () => !!this.currentUserSig() && !!this.accessTokenSig()
  );
  public currentUser = this.currentUserSig.asReadonly();

  /**
   * Effect runs once on creation and whenever token state changes.
   * Used here to check localStorage on startup and optionally save state changes.
   */
  constructor() {
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('currentUser');

    if (storedToken && storedUser) {
      try {
        this.accessTokenSig.set(storedToken);
        this.currentUserSig.set(JSON.parse(storedUser));
        console.log('AuthService: Restored session from storage.');
      } catch (e) {
        console.error('AuthService: Failed to parse stored user data.', e);
        this.clearSession(); // Clear corrupted storage
      }
    }

    effect(() => {
      const token = this.accessTokenSig();
      const user = this.currentUserSig();

      if (token && user) {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else if (!token && !user) this.clearSession();
    });
  }

  /**
   * Simulates a login API call.
   * @param credentials The user's email and password.
   * @returns Auth response observable.
   */
  login(credentials: LoginUserDto): Observable<AuthResponse> {
    return this.userService.validateUserLogin(credentials).pipe(
      map((response) => {
        // Update reactive signals on success
        this.setSession(response.accessToken, response.user);

        // Return mock response (this is the value of the Observable)
        return { accessToken: response.accessToken, user: response.user };
      })
    );
  }

  /**
   * Logs out the user by clearing the session state.
   */
  logout(): void {
    this.clearSession();
  }

  /**
   * Updates the internal signals with new session data.
   * @param token Auth token value.
   * @param user The user associated with the auth token.
   */
  private setSession(token: string, user: Partial<User>): void {
    this.accessTokenSig.set(token);
    this.currentUserSig.set(user);

    console.log('AuthService: Session successfully set.');
  }

  /**
   * Clears internal state and removes storage entries.
   */
  private clearSession(): void {
    this.accessTokenSig.set(null);
    this.currentUserSig.set(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');

    console.log('AuthService: Session cleared.');
  }
}
