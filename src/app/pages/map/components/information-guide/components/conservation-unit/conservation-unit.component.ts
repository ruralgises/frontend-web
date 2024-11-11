import { Component } from '@angular/core';
import { SectionTitleComponent } from "../section-title/section-title.component";
import { SectionDividerComponent } from "../section-divider/section-divider.component";

@Component({
  selector: 'app-conservation-unit',
  standalone: true,
  imports: [SectionTitleComponent, SectionDividerComponent],
  templateUrl: './conservation-unit.component.html',
  styleUrl: './conservation-unit.component.scss'
})
export class ConservationUnitComponent {

}
