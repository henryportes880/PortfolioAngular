import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Projeto {
  id: number;
  nome: string;
  descricao: string;
  tecnologias: string;
  link_github: string;
  ano: number;
}

@Injectable({ providedIn: 'root' })
export class ProjetoService {
  private http = inject(HttpClient);
  // URL limpa sem a formatação de markdown:
  private url = 'https://stunning-robot-4j4rwr9vjvq43qqj7-8000.app.github.dev/api/projetos.php';

  listar(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.url);
  }
}