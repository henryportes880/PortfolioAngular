import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';

interface Tecnologia {
  id: number;
  nome: string;
  descricao?: string;
  imagem?: string;
  categoria?: string;
}

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo implements OnInit {

  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  tecnologias: Tecnologia[] = [];
  carregando = true;
  erro = '';

  private url =
    'https://stunning-robot-4j4rwr9vjvq43qqj7-8000.app.github.dev/api/tecnologias.php';

  ngOnInit(): void {
    console.log('CATÁLOGO: ngOnInit executou');
    this.carregarCatalogo();
  }

  carregarCatalogo(): void {

    console.log('CATÁLOGO: buscando API...');
    console.log('URL:', this.url);

    this.carregando = true;
    this.erro = '';

    this.http.get<Tecnologia[]>(this.url).subscribe({

      next: (dados) => {

        console.log('CATÁLOGO: resposta recebida:', dados);

        this.tecnologias = dados;
        this.carregando = false;

        this.cdr.detectChanges();

        console.log('CATÁLOGO: carregamento finalizado');

      },

      error: (erro) => {

        console.error('CATÁLOGO: erro na API:', erro);

        this.erro = 'Não foi possível carregar o catálogo.';
        this.carregando = false;

        this.cdr.detectChanges();

      }

    });
  }
}