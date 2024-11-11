import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RuralProperty } from '../models/rural-gis-reponse/RuralProperty';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { MesageService } from '../../shared/services/mesage.service';

@Injectable({
  providedIn: 'root',
})
export class RuralPropertyService {
  private _http: HttpClient = inject(HttpClient);
  private _mesageService = inject(MesageService);

  getByCodeRuralPropreties(
    code: string,
    skip?: number,
    take?: number
  ): Observable<RuralProperty> {
    let params = new HttpParams();

    params = params.set('code', code);
    if (skip !== undefined) {
      params = params.set('skip', skip.toString());
    }
    if (take !== undefined) {
      params = params.set('take', take.toString());
    }

    return this._http.get<RuralProperty>(
      environment.baseUrl + 'RuralProperties',
      { params: params }
    );
  }

  downloadPdf(code: string): void {
    const params = new HttpParams().set('code', code);

    this._http
      .get(environment.baseUrl + 'RuralProperties/report', {
        params,
        responseType: 'blob',
      })
      .subscribe({
        next: (response) => {
          // Cria um URL de objeto para o blob
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);

          // Cria um link temporário e simula o clique para download
          const link = document.createElement('a');
          link.href = url;
          link.download = 'documento.pdf'; // Nome do arquivo de saída
          link.click();

          // Libera o objeto após o uso
          window.URL.revokeObjectURL(url);
        },
        error: (error : HttpErrorResponse) => {
          if(error.status == 404){
            this._mesageService.openSnackBar(
              "Número de CAR não encontrado"
            );
          }else{
            this._mesageService.openSnackBar(
              "Erro na requisição do PDF, tente novamente mais tarde"
            );
          }
        }
      });
  }
}
