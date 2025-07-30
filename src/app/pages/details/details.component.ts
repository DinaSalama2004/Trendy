import { Component, inject, OnInit } from '@angular/core';
import { GetProductsService } from '../../core/services/get Products/get-products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ActivatedRoute , RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastService } from '../../core/services/toastr/toast.service';

@Component({
  selector: 'app-details',
  imports: [ RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly productsService = inject(GetProductsService)
  private readonly activatedRoute = inject(ActivatedRoute)
  productDtails: Iproduct | null = null
  selectedImage: string | null = null;
  starStyles: string[] = [];
  prodId: string = ''
  starIcons: any;


  ngOnInit(): void {

    this.getProductId();
    this.getProductDetails();

  }

  // handel selected image to be active 
  changeImage(img: string): void {
    this.selectedImage = img;
  }

  // handel show stars
  generateStarStyles(rating: number): void {
    this.starStyles = [];

    for (let i = 0; i < 5; i++) {
      let width = 0;
      if (rating >= i + 1) {
        width = 100;
      } else if (rating > i) {
        width = Math.floor((rating - i) * 100); // you can also use
      }

      this.starStyles.push(`${width}%`);
    }
  }

 

// methods apis 
  getProductId() {

    this.activatedRoute.paramMap.subscribe(
      {
        next: (res) => {
          this.prodId = res.get('id')!;
          console.log("product id", res.get('id'));

        },
        error: (err) => {
          console.log("error fetch id ", err);

        }
      }
    )
  }


  getProductDetails(): void {

    this.productsService.getSpecificProduct(this.prodId).subscribe(
      {
        next: (res) => {
          this.productDtails = res.data
          this.selectedImage = res.data.imageCover;
          this.generateStarStyles(this.productDtails?.ratingsAverage || 0);
          console.log("product details", res.data);

        },
        error: (err) => {
          console.log("error when get product details", err);
        }
      }
    )
  }

  private readonly  cartService=inject(CartService) ; 
private readonly toastr=inject(ToastService) 

addToCard(ID:string){
this.cartService.addProductToCart(ID).subscribe(
  {
    next: (res) => {
   
      this.toastr.success(res.message)
      
  }, 
  error:(err)=>{
    console.log("error addProductToCart " , err);
    
  }
  }
)


}
}
