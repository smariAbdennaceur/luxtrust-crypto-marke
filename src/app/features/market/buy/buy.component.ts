import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockApiService } from '../../../core/services/mock-api.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Position } from '../../../core/models/position.model';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
  position?: Position;

  constructor(
    private route: ActivatedRoute,
    private mockApi: MockApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.mockApi.getPositionById(id).subscribe(position => {
      this.position = position;
    });
  }

  buy(): void {
    if (!this.position) return;
    
    this.mockApi.buyPosition(this.position.id).subscribe(success => {
      if (success) {
        alert('Purchase successful!');
        this.router.navigate(['/market']);
      } else {
        alert('Purchase failed. Position may already be sold.');
      }
    });
  }
}
