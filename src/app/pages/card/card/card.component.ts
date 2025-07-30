import { RouterLink } from '@angular/router';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Iproduct } from '../../../shared/interfaces/iproduct';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastService } from '../../../core/services/toastr/toast.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent  implements OnInit{
// declarations 
private readonly  cartService=inject(CartService) ; 
private readonly toastr=inject(ToastService) 
private wishlistService =inject(WishlistService)
@Input({ required: true }) products: Iproduct[]=[];
@Input() gridCols: string = 'md:grid-cols-4';
wishlist = new Set<string>();  
isLoading = signal<{ [productId: string]: boolean }>({'':false});

ngOnInit(): void {
  this.getAllWhishList() 
}

addToCard(ID: string) {
  this.isLoading.update(state => ({ ...state, [ID]: true }));

  this.cartService.addProductToCart(ID).subscribe({
    next: (res) => {
      this.toastr.success(res.message);
      this.isLoading.update(state => ({ ...state, [ID]: false }));
    },
    error: () => {
      this.isLoading.update(state => ({ ...state, [ID]: false }));
    }
  });
}


// WhishList

addToWish(prodId: string): void {

  if (this.isInWishlist(prodId)) {
    this.wishlistService.removePrpductfromWishList(prodId).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.wishlist.delete(prodId); 
      }
    });
  } 
  else {
    this.wishlistService.addPrpductToWishList(prodId).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.wishlist.add(prodId); 
      }
    });
  }
}

isInWishlist(productId: string): boolean {
  return this.wishlist.has(productId);
}

getAllWhishList(){
  this.wishlistService.getLoggenUserWhishList().subscribe({

    next: (res) => {
      this.toastr.success(res.message)
      // extracts the _id property from each product
      const ids = res.data.map((product: any) => product._id);
      // Store in Set
      this.wishlist = new Set<string>(ids);    
  }
  }) ;
}
}
