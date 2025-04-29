import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketRoutingModule } from './market-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MarketRoutingModule,
    MatCard,
    MatToolbarModule, MatButtonModule
  ]
})
export class MarketModule { }
