import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { ContatoService, NovoContato } from '../contato.service';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './contato.html',
  styleUrl: './contato.css'
})
export class Contato {
  private contatoService = inject(ContatoService);
  private cdr = inject(ChangeDetectorRef);

  dados: NovoContato = {
    nome: '',
    email: '',
    mensagem: ''
  };

  mensagemSucesso: string = '';
  errosValidacao: string[] = [];
  enviando: boolean = false;

  onSubmit(): void {
    this.enviando = true;
    this.mensagemSucesso = '';
    this.errosValidacao = [];

    this.contatoService.enviar(this.dados).subscribe({
      next: (res) => {
        this.mensagemSucesso =
          res.mensagem || 'Contato enviado com sucesso!';

        this.dados = {
          nome: '',
          email: '',
          mensagem: ''
        };

        this.enviando = false;
        this.cdr.detectChanges();
      },

      error: (err) => {
        if (err.error && err.error.erros) {
          this.errosValidacao = err.error.erros;
        } else {
          this.errosValidacao = [
            'Erro ao enviar mensagem. Tente novamente.'
          ];
        }

        this.enviando = false;
        this.cdr.detectChanges();
      }
    });
  }
}