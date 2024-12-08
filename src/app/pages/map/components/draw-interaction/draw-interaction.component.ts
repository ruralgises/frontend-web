import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MapStateService } from '../../../../shared/services/map-state.service';
import VectorSource from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw';
import { ListRuralPropertiesMinimumService } from '../../../../shared/services/list-rural-properties-minimum.service';
import { CARSelectedStateService } from '../../../../shared/services/car-selected-state.service';

@Component({
  selector: 'app-draw-interaction',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './draw-interaction.component.html',
  styleUrl: './draw-interaction.component.scss',
})
export class DrawInteractionComponent {
  private _listRuralPropertiesMinimumService = inject(ListRuralPropertiesMinimumService);
  private _carSelectedStateService = inject(CARSelectedStateService);
  private _mapState = inject(MapStateService);
  private drawInteraction: Draw | null = null;
  private vectorSource = new VectorSource();

  addOrRemoveDrawInteraction() {
    if(this.drawInteraction){
      this._mapState.map?.removeInteraction(this.drawInteraction);
      this._mapState.isDrawing.next(false);
      this.drawInteraction;
    }else{
      this._carSelectedStateService.update(null);
      this.drawInteraction = new Draw({
        source: this.vectorSource, // Adiciona as geometrias desenhadas nesta fonte
        type: 'Polygon', // Define o tipo de geometria (pode ser Point, LineString, etc.)
      });

      // Adiciona o evento ao mapa
      this._mapState.map?.addInteraction(this.drawInteraction);
      this._mapState.isDrawing.next(true);

      // Evento ao finalizar o desenho
      this.drawInteraction.on('drawend', (event) => {
        const feature = event.feature;
        if(feature.getGeometry()){
          this._listRuralPropertiesMinimumService.searchDrawPolygon(
            feature.getGeometry()!
          );
        }
        this._mapState.map?.removeInteraction(this.drawInteraction!);
        this.drawInteraction = null;
        this._mapState.isDrawing.next(false);
      });
    }
  }
}
