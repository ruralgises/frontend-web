import { Injectable } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS } from 'ol/source';
import { environment } from '../../../environments/environment';
import { defaults as defaultControls } from 'ol/control';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapStateService {
  public map?: Map;
  public isDrawing = new Subject<boolean>();
  public DrawingAux  = true;
}
