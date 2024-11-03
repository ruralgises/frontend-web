import { Component } from '@angular/core';
import { SectionDividerComponent } from "../section-divider/section-divider.component";
import { SectionTitleComponent } from "../section-title/section-title.component";

@Component({
  selector: 'app-settlement',
  standalone: true,
  imports: [SectionDividerComponent, SectionTitleComponent],
  templateUrl: './settlement.component.html',
  styleUrl: './settlement.component.scss'
})
export class SettlementComponent {

}
