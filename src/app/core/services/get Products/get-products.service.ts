import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService  {

  constructor(private httpClient:HttpClient) { }

getProducts(options?: {
  categoryId?: string;
  sort?: string;
  priceGte?: number;
  priceLte?: number;
}): Observable<any> {
  let params = new HttpParams();

  if (options?.categoryId) {
    params = params.set('category[in]', options.categoryId);
  }

  if (options?.sort) {
    params = params.set('sort', options.sort);
  }

  if (options?.priceGte !== undefined) {
    params = params.set('price[gte]', options.priceGte.toString());
  }

  if (options?.priceLte !== undefined) {
    params = params.set('price[lte]', options.priceLte.toString());
  }

  return this.httpClient.get(
    `${environment.baseUrl}products`,
    { params }
  );
}

  getSpecificProduct(id:string):Observable<any>{

    return this.httpClient.get(`${environment.baseUrl}products/${id}`)

  }
}
