import { HttpClient } from '@angular/common/http';
import { Inject, Injectable , PLATFORM_ID, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/env';
import { tap } from 'rxjs/operators';
import { platform } from 'node:os';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  token:string=''
  constructor(private readonly httpClient: HttpClient  ,  @Inject(PLATFORM_ID) private platformId: Object ) { 

    if (isPlatformBrowser(this.platformId)) {
      if(localStorage.getItem("token")){
      this.token=localStorage.getItem("token")!
      this.getLoggenUserCart().subscribe({})
      }
    }
  }




  numberOfCartItems = signal<number>(0);
 


  addProductToCart(prodId: string): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}cart`,
      {
        "productId":prodId
      },
      {
        headers: {

          token:localStorage.getItem("token") || ''
        }
      }
    ).pipe(
          tap((res: any) => {
            if (res?.status === 'success') {
              this.numberOfCartItems.set(res.numOfCartItems);
            }
          })
        );
  }



  updateCartProductQuantity(productId: string, count: number): Observable<any> {


    return this.httpClient.put(`${environment.baseUrl}cart/${productId}`, 
      {
        "count": `${count}`
      },

      {
        headers: {
          token:localStorage.getItem("token") || ''
        }
      }
    ).pipe(
      tap((res: any) => {
        if (res?.status === 'success') {
          this.numberOfCartItems.set(res.numOfCartItems);
        }
      })
    );

  }


  getLoggenUserCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}cart`,
      {

        headers: {
          token:localStorage.getItem("token") || '' 
        }
      }
    ).pipe(
      tap((res: any) => {
        if (res?.status === 'success') {
          this.numberOfCartItems.set(res.numOfCartItems);
        }
      })
    );

  }


  removeSpecificCartItem(prodId: string): Observable<any> {

    return this.httpClient.delete(`${environment.baseUrl}cart/${prodId}`,
      {
        headers: {
          token:localStorage.getItem("token") || ''
        }
      }
    )
  }


  clearUserCart(): Observable<any> {

    return this.httpClient.delete(`${environment.baseUrl}cart`,
      {
        headers: {
          token:localStorage.getItem("token") || ''
        }
      }
    )
  }

}

