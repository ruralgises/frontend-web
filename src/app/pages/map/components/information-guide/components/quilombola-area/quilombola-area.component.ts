import { Component, input } from '@angular/core';
import { RuralProperty } from '../../../../../../core/models/rural-gis-reponse/RuralProperty';
import { SectionTitleComponent } from "../section-title/section-title.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { SectionDividerComponent } from '../section-divider/section-divider.component';

@Component({
  selector: 'app-quilombola-area',
  standalone: true,
  imports: [SectionTitleComponent, MatExpansionModule, SectionDividerComponent],
  templateUrl: './quilombola-area.component.html',
  styleUrl: './quilombola-area.component.scss',
})
export class QuilombolaAreaComponent {
  ruralProperty = input.required<RuralProperty | null>();
}
