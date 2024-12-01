import { Component, signal } from '@angular/core';
import { LengendComponent } from './lengend/lengend.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-map-controls',
  standalone: true,
  imports: [LengendComponent, MatButtonModule, MatIconModule],
  templateUrl: './map-controls.component.html',
  styleUrl: './map-controls.component.scss',
})
export class MapControlsComponent {
  toCloseLegend = signal<boolean>(true);
}
