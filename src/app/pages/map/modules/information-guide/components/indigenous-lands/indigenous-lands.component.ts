import { Component } from '@angular/core';
import { SectionDividerComponent } from "../section-divider/section-divider.component";
import { SectionTitleComponent } from "../section-title/section-title.component";

@Component({
  selector: 'app-indigenous-lands',
  standalone: true,
  imports: [SectionDividerComponent, SectionTitleComponent],
  templateUrl: './indigenous-lands.component.html',
  styleUrl: './indigenous-lands.component.scss'
})
export class IndigenousLandsComponent {

}
