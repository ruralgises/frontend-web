import { Component, input } from '@angular/core';
import { SectionDividerComponent } from "../section-divider/section-divider.component";
import { SectionTitleComponent } from "../section-title/section-title.component";
import { RuralProperty } from '../../../../../../core/models/rural-gis-reponse/RuralProperty';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-indigenous-lands',
  standalone: true,
  imports: [SectionDividerComponent, SectionTitleComponent, MatExpansionModule],
  templateUrl: './indigenous-lands.component.html',
  styleUrl: './indigenous-lands.component.scss',
})
export class IndigenousLandsComponent {
  ruralProperty = input.required<RuralProperty | null>();
}
