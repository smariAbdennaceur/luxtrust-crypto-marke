import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MockApiService } from '../../../core/services/mock-api.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,    
  ],
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mockApi: MockApiService,
    private router: Router
  ) {
    this.form = this.fb.group({
      currency: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  sell(): void {
    if (this.form.valid) {
      this.mockApi.addSellPosition(this.form.value).subscribe(() => {
        this.router.navigate(['/market']);
      });
    }
  }
}
