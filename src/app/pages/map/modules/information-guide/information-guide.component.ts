import { AsyncPipe } from '@angular/common';
import { Component, output, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CarComponent } from './components/car/car.component';
import { LocationComponent } from "./components/location/location.component";
import { ConservationUnitComponent } from "./components/conservation-unit/conservation-unit.component";
import { IndigenousLandsComponent } from "./components/indigenous-lands/indigenous-lands.component";
import { SettlementComponent } from "./components/settlement/settlement.component";
import { DeforestationComponent } from "./components/deforestation/deforestation.component";
import { EmbargoComponent } from "./components/embargo/embargo.component";

@Component({
  selector: 'app-information-guide',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    AsyncPipe,
    CarComponent,
    LocationComponent,
    ConservationUnitComponent,
    IndigenousLandsComponent,
    SettlementComponent,
    DeforestationComponent,
    EmbargoComponent
],
  templateUrl: './information-guide.component.html',
  styleUrl: './information-guide.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class InformationGuideComponent {
  toClosed = output();
}
