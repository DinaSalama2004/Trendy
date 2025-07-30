import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { GetProductsService } from '../../core/services/get Products/get-products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { Icart } from '../../shared/interfaces/icart';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../core/services/toastr/toast.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  imports: [RouterLink]
})
export class CartComponent implements OnInit {

  // declations
  private readonly cartService = inject(CartService);
  private readonly productService = inject(GetProductsService);
  cartDetails:Icart={} as Icart

  private readonly toastr=inject(ToastService) 


  ngOnInit(): void {
    this.getLoggenUserCart();
  }

  getLoggenUserCart() {
    this.cartService.getLoggenUserCart().subscribe({
      next: (res) => {
        this.cartDetails=res.data
    }
   });
  }



  clearUserCart(){
    this.cartService.clearUserCart().subscribe(
      {
      next: (res) => {
          this.cartDetails.products=[] ;
          this.toastr.success("cart cleared successfully")
      }
      }
    )
  }


  removeCartItem(id:string){
    this.cartService.removeSpecificCartItem(id).subscribe(
      {
        next: (res) => {
          this.cartDetails=res.data
          this.toastr.success("product removed successfully")
      }
      }
    )

  }

  updateQuantity(id:string , count:number){
    this.cartService.updateCartProductQuantity(id , count).subscribe(

    {     
      next: (res) => {
            this.cartDetails=res.data
            this.toastr.success(" quantity updated successfully ")
        }
    }
    )
  }
}