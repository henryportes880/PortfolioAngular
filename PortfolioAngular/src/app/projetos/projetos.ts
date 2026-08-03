import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProjetoService, Projeto } from '../projeto.service';

@Component({
  selector: 'app-projetos',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './projetos.html'
})
export class Projetos implements OnInit {
  private service = inject(ProjetoService);
  private cdr = inject(ChangeDetectorRef);

  projetos: Projeto[] = [];
  carregando = true;
  erro = '';

  ngOnInit() {
    this.service.listar().subscribe({
      next: (lista) => {
        this.projetos = lista;
        this.carregando = false;
        this.cdr.detectChanges(); // Força a tela a atualizar imediatamente
      },
      error: (err) => {
        console.error('Erro ao buscar projetos:', err);
        this.erro = 'Não foi possível carregar os projetos.';
        this.carregando = false;
        this.cdr.detectChanges(); // Força a tela a atualizar mesmo em caso de erro
      }
    });
  }
}