import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-section-divider',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './section-divider.component.html',
  styleUrl: './section-divider.component.scss',
})
export class SectionDividerComponent {}
