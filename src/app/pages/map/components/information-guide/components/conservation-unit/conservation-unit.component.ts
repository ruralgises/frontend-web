import { Component, input } from '@angular/core';
import { SectionTitleComponent } from "../section-title/section-title.component";
import { SectionDividerComponent } from "../section-divider/section-divider.component";
import { RuralProperty } from '../../../../../../core/models/rural-gis-reponse/RuralProperty';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-conservation-unit',
  standalone: true,
  imports: [SectionTitleComponent, SectionDividerComponent, MatExpansionModule],
  templateUrl: './conservation-unit.component.html',
  styleUrl: './conservation-unit.component.scss',
})
export class ConservationUnitComponent {
  ruralProperty = input.required<RuralProperty | null>();
}
