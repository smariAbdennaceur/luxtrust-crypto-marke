import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
import { Position } from '../../../core/models/position.model';
import { AsyncPipe, NgFor } from '@angular/common';
import { MockApiService } from '../../../core/services/mock-api.service';
import { Observable } from 'rxjs';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule,MatCard, AsyncPipe, NgFor,MatButton],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  positions$: Observable<Position[]>;
  
  constructor(private api: MockApiService, private router: Router) {
    this.positions$ = this.api.getAllPositions();
  }
  
 /*  buy(id: number) {
    this.api.buyPosition(id).subscribe(success => {
      alert(success ? 'Achat effectué' : 'Impossible d’acheter cette position');
    });
  } */
    buy(id: number) {
      this.router.navigate(['/market/buy', id]);
    }

  delete(id: number) {
    this.api.deletePosition(id).subscribe(success => {
      alert(success ? 'Position supprimée' : 'Suppression non autorisée');
    });
  }
}
