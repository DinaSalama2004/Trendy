import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private readonly httpClient:HttpClient) { }


  checkOut(cardId:string , checkOutForm:object):Observable<any>{

    return this.httpClient.post(`${environment.baseUrl}orders/checkout-session/${cardId}?url=${window.location.origin}` 
      , 

      {
        "shippingAddress":checkOutForm
    }
 ,
    {
      headers:{
      token: localStorage.getItem('token') || ''
      }
    }
    )
  }


    createCashashOrder(cardId:string , checkOutForm:object):Observable<any>{

    return this.httpClient.post(`${environment.baseUrl}orders/${cardId}` 
      , 

      {
        "shippingAddress":checkOutForm
    }
 ,
    {
      headers:{
       token: localStorage.getItem('token') || ''
      }
    }
    )
  }
  getAllUserOrders(userId:string):Observable<any>{

    return this.httpClient.get(`${environment.baseUrl}orders/user/${userId}`)
  }
}
