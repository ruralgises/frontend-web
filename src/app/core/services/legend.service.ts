import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LegendService {
  private _http = inject(HttpClient);
  private _params = new HttpParams();

  private _legend = new BehaviorSubject<string | null>(null);
  legend$ = this._legend.asObservable();

  fontColor = window.matchMedia('(prefers-color-scheme: light)').matches
    ? '000000'
    : 'FFFFFF';

  constructor() {
    this._params = this._params.set('service', 'WMS');
    this._params = this._params.set('version', environment.WMSVersion);
    this._params = this._params.set('layer', environment.legend);
    this._params = this._params.set('request', 'GetLegendGraphic');
    this._params = this._params.set('FORMAT', environment.WMSFormat);
    this._params = this._params.set('group', '');
    this._params = this._params.set('TRANSPARENT', 'true');

    window
      .matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', (event) => {
        this.fontColor = event.matches ? '000000' : 'FFFFFF';
        this.getLegend();
      });

    this.getLegend();
  }

  getLegend() {
    this._params = this._params.set(
      'LEGEND_OPTIONS',
      'forceTitles:off;labelMargin:0;excludeLayerName:false;fontColor:' +
        this.fontColor
    );

    this._http
      .get(environment.baseGeoserver, {
        responseType: 'blob',
        params: this._params,
      })
      .pipe(
        map((res: Blob) => {
          return URL.createObjectURL(res);
        })
      ).subscribe((legend) => {
        this._legend.next(legend);
      });
  }
}
