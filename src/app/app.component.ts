import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './core/services/auth.service';
import { User } from './core/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$!: Observable<User | null>;

  constructor(public auth: AuthService, private router: Router) {
    this.user$ = this.auth.currentUser$;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  isAdmin(user: User): boolean {
    console.log('user ',user)
    return user.role === 'ADMINISTRATOR';
  }

  isUser(user: User): boolean {
    return user.role === 'USER';
  }
}
