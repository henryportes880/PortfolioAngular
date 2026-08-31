import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sobre',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css'
})
export class Sobre {}