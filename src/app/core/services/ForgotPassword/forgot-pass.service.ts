import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassService {

  constructor(private readonly httpClient:HttpClient) { }

  forgotPassword(obj:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}auth/forgotPasswords` ,obj )

  }

  VerifyResetCode(obj:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}auth/verifyResetCode` ,obj )

  }


  resetPassword(obj:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}auth/resetPassword` ,obj )

  }
}
