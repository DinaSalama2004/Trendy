import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/env';
import { Iproduct } from '../../../shared/interfaces/iproduct';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpClient: HttpClient) {}

  // Create signal to hold wishlist data
  wishlistSignal = signal<Iproduct[]>([]);

  private token = localStorage.getItem("token") || '';

  // Fetch wishlist from backend and update the signal
  getLoggenUserWhishList(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}wishlist`, {
      headers: { token: this.token }
    }).pipe(
      tap((res: any) => {
        if (res?.status === 'success') {
          this.wishlistSignal.set(res.data);
        }
      })
    );
  }

  // Add product to wishlist
  addPrpductToWishList(prodId: string): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}wishlist`,
      { productId: prodId },
      { headers: { token: this.token } }
    );
  }

  // Remove product from wishlist
  removePrpductfromWishList(prodId: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}wishlist/${prodId}`,
      { headers: { token: this.token } }
    ).pipe(
      tap(() => {
        // Update signal immediately (optimistic update)
        const current = this.wishlistSignal();
        this.wishlistSignal.set(current.filter(item => item._id !== prodId));
      })
    );
  }
}
