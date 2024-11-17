import { Component } from '@angular/core';
import { LengendComponent } from "./lengend/lengend.component";

@Component({
  selector: 'app-map-controls',
  standalone: true,
  imports: [LengendComponent],
  templateUrl: './map-controls.component.html',
  styleUrl: './map-controls.component.scss'
})
export class MapControlsComponent {

}
