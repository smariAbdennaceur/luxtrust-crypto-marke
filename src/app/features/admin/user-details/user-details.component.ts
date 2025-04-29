import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MockApiService } from '../../../core/services/mock-api.service';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user?: User | null;

  constructor(
    private route: ActivatedRoute,
    private mockApi: MockApiService
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.mockApi.getUserByUsername(username).subscribe(user => {
        this.user = user;
      });
    }
  }
}
