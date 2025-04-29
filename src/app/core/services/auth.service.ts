import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { MockApiService } from './mock-api.service';
import { User, Role } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private api: MockApiService) {}

  register(user: User): Observable<boolean> {
    return this.api.register(user);
  }

  login(username: string): Observable<boolean> {
    return this.api.login(username).pipe(
      tap(success => {
        if (success) {
          this.api.getCurrentUser().subscribe(user => {
            this.currentUserSubject.next(user);
          });
        }
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  hasRole(role: Role): boolean {
    return this.currentUserSubject.value?.role === role;
  }

  isUser(): boolean {
    return this.hasRole('USER');
  }

  isAdmin(): boolean {
    return this.hasRole('ADMINISTRATOR');
  }
}
