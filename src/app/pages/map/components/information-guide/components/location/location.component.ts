import { Component, input } from '@angular/core';
import { SectionDataComponent } from '../section-data/section-data.component';
import { SectionDividerComponent } from '../section-divider/section-divider.component';
import { SectionTitleComponent } from '../section-title/section-title.component';
import { RuralProperty } from '../../../../../../core/models/rural-gis-reponse/RuralProperty';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    SectionDataComponent,
    SectionTitleComponent,
    SectionDividerComponent,
  ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  ruralProperty = input.required<RuralProperty | null>();
}
