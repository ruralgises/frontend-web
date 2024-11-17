import { Component, input } from '@angular/core';
import { SectionDividerComponent } from "../section-divider/section-divider.component";
import { SectionTitleComponent } from "../section-title/section-title.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { RuralProperty } from '../../../../../../core/models/rural-gis-reponse/RuralProperty';

@Component({
  selector: 'app-settlement',
  standalone: true,
  imports: [SectionDividerComponent, SectionTitleComponent, MatExpansionModule],
  templateUrl: './settlement.component.html',
  styleUrl: './settlement.component.scss',
})
export class SettlementComponent {
  ruralProperty = input.required<RuralProperty | null>();
}
