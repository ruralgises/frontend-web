import { Component, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RuralProperty } from '../../../../../../core/models/rural-gis-reponse/RuralProperty';
import { SectionTitleComponent } from "../section-title/section-title.component";
import { SectionDividerComponent } from "../section-divider/section-divider.component";

@Component({
  selector: 'app-embargo',
  standalone: true,
  imports: [MatExpansionModule, SectionTitleComponent, SectionDividerComponent],
  templateUrl: './embargo.component.html',
  styleUrl: './embargo.component.scss',
})
export class EmbargoComponent {
  ruralProperty = input.required<RuralProperty | null>();
}
