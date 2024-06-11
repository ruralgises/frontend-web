import { Component, signal } from '@angular/core';
import { MapViewComponent } from './components/map-view/map-view.component';
import { InformationGuideComponent } from './components/information-guide/information-guide.component';
import { SideOptionsComponent } from './components/side-options/side-options.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MapViewComponent, InformationGuideComponent, SideOptionsComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  sideOptionsIsOpen = signal(true);
}
