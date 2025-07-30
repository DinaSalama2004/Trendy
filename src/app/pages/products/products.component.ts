import { Icategory } from './../../shared/interfaces/icategory';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { GetProductsService } from './../../core/services/get Products/get-products.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../core/services/Categories/categories.service';
import { CardComponent } from "../card/card/card.component";
import { FormsModule } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-products',
  imports: [CardComponent, FormsModule ,NgxSliderModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  // declarations 
  private readonly getProductsService = inject(GetProductsService);
  private readonly categoriesService = inject(CategoriesService);
  ProductList = signal<Iproduct[]>([]);
  filteredProductList = signal<Iproduct[]>([]);
  categorList = signal<Icategory[]>([]);
  categoryId = signal<string | undefined>(undefined)
  value: number = 0;
  highValue: number = 50000;
  options: Options = {
    floor: 0,
    ceil: 50000,
    step: 1000,
    showSelectionBar: true, // Enables the colored range
    // Sets a static color for the selection bar
    getSelectionBarColor: () => '#DD6B20',

    // Sets the color of the circle
    getPointerColor: () => '#DD6B20',
    selectionBarGradient: {
      from: '#DD6B20',
      to: '#059669'
    }
  };



search(term: string): void {
  console.log(term);

  const allProducts = this.ProductList(); // read signal value
console.log("before" , allProducts);

  if (!term.trim()) {
    this.filteredProductList.set(allProducts); // reset
  } 
   {
    const filtered = allProducts.filter(product =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    this.filteredProductList.set(filtered);
    console.log("after" , filtered);
    
  }
}



  ngOnInit(): void {
    this.getProductData()
    this.getCategoryData()

  }


  // filters 

  getCategoryName(): string {

    if (!this.categoryId()) return 'All Products';

    const category = this.categorList().find(cat => cat._id === this.categoryId());
    return category?.name ?? 'All Products';
  }

  getProductData(catId?: string): void {
    this.categoryId.set(catId);
    this.getProductsService.getProducts({
      categoryId: catId,
    }).subscribe({
      next: (res) => {
        this.ProductList.set(res.data);
        this.filteredProductList.set(res.data);
      }
    });
  }

  getCategoryData(): void {

    this.categoriesService.getCategories().subscribe(
      {

        next: (res) => {
          this.categorList.set(res.data);

        }
      }
    )


  }


  //  price filter 
  onRangeChange() {
    console.log('Min:', this.value, 'Max:', this.highValue);
    this.getProductsService.getProducts({
      priceGte: this.value,
      priceLte: this.highValue,
      categoryId: this.categoryId()
    }).subscribe({
      next: (res) => {
        console.log("get product with filter price  ", res.data);
        this.ProductList.set(res.data);
      }
    });
  }







}