import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient:HttpClient) { }


 getBrands():Observable<any>{

    return this.httpClient.get(`${environment.baseUrl}brands`)

  }

  getSpecificBrand(brandId:string):Observable<any>{

    return this.httpClient.get(`${environment.baseUrl}brands/${brandId}`)

  }

}
