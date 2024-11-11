import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-embargo',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './embargo.component.html',
  styleUrl: './embargo.component.scss',
})
export class EmbargoComponent {}
