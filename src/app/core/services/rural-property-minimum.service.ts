import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RuralProperty } from '../models/rural-gis-reponse/RuralProperty';
import { RuralPropertyMinimum } from '../models/rural-gis-reponse/RuralPropertyMinimum';
import { GeoSpatialInformation } from '../models/rural-gis-reponse/GeoSpatialInformation';

@Injectable({
  providedIn: 'root',
})
export class RuralPropertyMinimumService {
  constructor(private http: HttpClient) {}

  getByCoordinateRuralPropretiesMinimum(
    x: number,
    y: number,
    skip?: number,
    take?: number
  ): Observable<GeoSpatialInformation<RuralPropertyMinimum>> {
    let params = new HttpParams();

    params = params.set('Coordinate.X', x);
    params = params.set('Coordinate.Y', y);

    if (skip !== undefined) {
      params = params.set('skip', skip.toString());
    }
    if (take !== undefined) {
      params = params.set('take', take.toString());
    }

    return this.http.get<GeoSpatialInformation<RuralPropertyMinimum>>(
      environment.baseUrl + 'RuralPropertiesMinimum/bycoordinate',
      { params: params }
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
      { params: params }
    );
  }
}
