import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjetoService, Projeto } from '../projeto.service';

@Component({
  selector: 'app-gestao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './gestao.html',
  styleUrl: './gestao.css'
})
export class Gestao implements OnInit {
  private service = inject(ProjetoService);

  projetos: Projeto[] = [];
  carregando = true;
  erro = '';

  novoProjeto: Projeto = {
    nome: '',
    descricao: '',
    tecnologias: '',
    link_github: '',
    ano: 2026
  };

  ngOnInit() {
    this.carregarProjetos();
  }

  carregarProjetos() {
    this.carregando = true;
    this.service.listar().subscribe({
      next: (dados) => {
        this.projetos = dados;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Erro ao carregar projetos.';
        this.carregando = false;
      }
    });
  }

  editar(item: Projeto) {
    this.novoProjeto = { ...item };
  }

  salvar() {
    if (this.novoProjeto.id) {
      this.service.atualizar(this.novoProjeto.id, this.novoProjeto).subscribe({
        next: () => {
          this.resetarFormulario();
          this.carregarProjetos();
        }
      });
    } else {
      this.service.criar(this.novoProjeto).subscribe({
        next: () => {
          this.resetarFormulario();
          this.carregarProjetos();
        }
      });
    }
  }

  excluir(id: number | undefined) {
    if (!id) return;
    if (confirm('Deseja realmente excluir este projeto?')) {
      this.service.excluir(id).subscribe({
        next: () => {
          this.carregarProjetos();
        }
      });
    }
  }

  resetarFormulario() {
    this.novoProjeto = {
      nome: '',
      descricao: '',
      tecnologias: '',
      link_github: '',
      ano: 2026
    };
  }
}