import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/env';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userData:any; 
  constructor(private httpClient:HttpClient) {
   }


   signUp(user:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}auth/signup` ,user )
   }

   signIn(user:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}auth/signin` ,user )
   }

   getUserData():void{
this.userData=  jwtDecode(localStorage.getItem('token')!);
console.log(this.userData);

   }
}
