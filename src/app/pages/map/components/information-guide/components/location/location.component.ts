import { Component } from '@angular/core';
import { SectionDataComponent } from '../section-data/section-data.component';
import { SectionDividerComponent } from '../section-divider/section-divider.component';
import { SectionTitleComponent } from '../section-title/section-title.component';

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
export class LocationComponent {}
