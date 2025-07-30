
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/env';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<any>{

    return this.httpClient.get(`${environment.baseUrl}categories`)

  }

  getSpecificCategory(id:string):Observable<any>{

    return this.httpClient.get(`${environment.baseUrl}categories/${id}`)

  }
}
