import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    AsyncPipe
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
     private currentUserSubject = new BehaviorSubject<User | null>(null);
      public user$ = this.currentUserSubject.asObservable();

  constructor(private auth: AuthService) {
    this.user$ = this.auth.currentUser$;
  }
}
