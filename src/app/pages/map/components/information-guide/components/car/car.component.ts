import { Component, input } from '@angular/core';
import { SectionDataComponent } from '../section-data/section-data.component';
import { SectionTitleComponent } from '../section-title/section-title.component';
import { SectionDividerComponent } from '../section-divider/section-divider.component';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [
    SectionDataComponent,
    SectionTitleComponent,
    SectionDividerComponent
  ],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss'
})
export class CarComponent {
  car = input.required<string>()
}
