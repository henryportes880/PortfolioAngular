import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-sobre',
  imports: [MatCardModule, MatChipsModule, MatDividerModule],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css'
})
export class Sobre {}