import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RuralProperty } from '../models/rural-gis-reponse/RuralProperty';
import { RuralPropertyMinimum } from '../models/rural-gis-reponse/RuralPropertyMinimum';
import { GeoSpatialInformation } from '../models/rural-gis-reponse/GeoSpatialInformation';
import { Geometry } from 'ol/geom';
import GeoJSON from 'ol/format/GeoJSON';
import { Geometry as Geom} from 'geojson';
import { GetByGeometryRuralPropretiesMinimum } from '../models/rural-gis-request/GetByGeometryRuralPropretiesMinimum';
import { J } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root',
})
export class RuralPropertyMinimumService {
  constructor(private http: HttpClient) {}

  private geojsonFormat = new GeoJSON();
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getByGeometryRuralPropretiesMinimum(
    geometry: Geometry,
    skip?: number,
    take?: number
  ): Observable<GeoSpatialInformation<RuralPropertyMinimum>> {
    let params = new HttpParams();
    const request: GetByGeometryRuralPropretiesMinimum = {
      geometry: JSON.parse(this.geojsonFormat.writeGeometry(geometry)) as Geom,
    };

    if (skip !== undefined) {
      request.skip = skip;
    }
    if (take !== undefined) {
      request.take = take;
    }

    return this.http.post<GeoSpatialInformation<RuralPropertyMinimum>>(
      environment.baseUrl + 'RuralPropertiesMinimum/bygeometry',
      request,
      { headers: this.headers }
    );
  }

  getByCodeRuralPropretiesMinimum(
    code: string,
    skip?: number,
    take?: number
  ): Observable<GeoSpatialInformation<RuralPropertyMinimum>> {
    let params = new HttpParams();

    params = params.set('code', code);

    if (skip !== undefined) {
      params = params.set('skip', skip.toString());
    }
    if (take !== undefined) {
      params = params.set('take', take.toString());
    }

    return this.http.get<GeoSpatialInformation<RuralPropertyMinimum>>(
      environment.baseUrl + 'RuralPropertiesMinimum/bycode',
      { params: params,
        headers: this.headers
      }
    );
  }
}
