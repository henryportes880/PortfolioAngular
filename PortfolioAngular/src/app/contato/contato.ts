import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContatoService, NovoContato } from '../contato.service';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contato.html',
  styleUrl: './contato.css'
})
export class Contato {
  private contatoService = inject(ContatoService);
  private cdr = inject(ChangeDetectorRef); // Injeta o detector de mudancas

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
        this.mensagemSucesso = res.mensagem || 'Contato enviado com sucesso!';
        this.dados = { nome: '', email: '', mensagem: '' };
        this.enviando = false;
        this.cdr.detectChanges(); // Force a atualizacao imediata da tela!
      },
      error: (err) => {
        if (err.error && err.error.erros) {
          this.errosValidacao = err.error.erros;
        } else {
          this.errosValidacao = ['Erro ao enviar mensagem. Tente novamente.'];
        }
        this.enviando = false;
        this.cdr.detectChanges(); // Force a atualizacao imediata em caso de erro!
      }
    });
  }
}