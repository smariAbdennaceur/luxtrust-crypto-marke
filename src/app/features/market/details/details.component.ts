import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockApiService } from '../../../core/services/mock-api.service';
import { MatCardModule } from '@angular/material/card';
import { Position } from '../../../core/models/position.model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  position?: Position;

  constructor(
    private route: ActivatedRoute,
    private mockApi: MockApiService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.mockApi.getPositionById(id).subscribe(position => {
      this.position = position;
    });
  }
}
