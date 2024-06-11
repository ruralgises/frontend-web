import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule],
  template: `
    <mat-sidenav-container>
      <router-outlet></router-outlet>
    </mat-sidenav-container>
  `,
})
export class AppComponent {
  title = 'frontend-web';
}
