import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'portfolio-angular';

  // Sinais de controle de tela
  drawerMode = signal<'over' | 'side'>('side');
  drawerOpened = signal<boolean>(true);
  isMobile = signal<boolean>(false);

  // Lista única de links de navegação
  links = [
    { path: '/', label: 'Home', icon: 'home', exact: true },
    { path: '/sobre', label: 'Sobre', icon: 'person', exact: false },
    { path: '/projetos', label: 'Projetos', icon: 'work', exact: false },
    { path: '/catalogo', label: 'Catálogo', icon: 'apps', exact: false },
    { path: '/contato', label: 'Contato', icon: 'mail', exact: false },
    { path: '/gestao', label: 'Gestão', icon: 'settings', exact: false }
  ];

  closeOnMobile(sidenav: MatSidenav) {
    if (this.isMobile()) {
      sidenav.close();
    }
  }
}