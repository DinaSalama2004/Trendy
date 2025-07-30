import { BrandsService } from './../../core/services/brands/brands.service';
import { Component, inject, signal, effect } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { CategoriesService } from '../../core/services/Categories/categories.service';
import { GetProductsService } from './../../core/services/get Products/get-products.service';

import { Icategory } from '../../shared/interfaces/icategory';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CardComponent } from "../card/card/card.component";
import { Ibrand } from '../../shared/interfaces/ibrand';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // Inject services
  private readonly categoriesService = inject(CategoriesService);
  private readonly brandsService = inject(BrandsService);
  private readonly productsService = inject(GetProductsService);

  // Signals
  AllCategorys = signal<Icategory[]>([]);
  AllBrands = signal<Ibrand[]>([]);
  AllProduct = signal<Iproduct[]>([]);
  filteredProducts = signal<Iproduct[]>([]);

  constructor() {
    // Effect to trigger initial fetch
    effect(() => {
      this.getAllCategories();
      this.getAllProducts();
      this.getAllBrands();
    });
  }

  // Fetch Categories
  getAllCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.AllCategorys.set(res.data);
      },
    });
  }

    getAllBrands(): void {
    this.brandsService.getBrands().subscribe({
      next: (res) => {
        this.AllBrands.set(res.data);
      },
    });
  }

  // Fetch Products
  getAllProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.AllProduct.set(res.data);
        const sorted = res.data
          .sort((a: Iproduct, b: Iproduct) => b.ratingsAverage - a.ratingsAverage)
          .slice(0, 20);
        this.filteredProducts.set(sorted);
      },
    });
  }

  // Filter by Category
  filterProduct(category: string): void {
    const filtered = this.AllProduct().filter(
      (p) => p.category?.name === category
    );
    this.filteredProducts.set(filtered);
    console.log('filtered category ', category, filtered);
  }

  staticCursol: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    rtl: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 2000,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      1024: {
        items: 1,
      },
    },
  };
  

  // Categories carousel options
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
      autoplay: true,
    pullDrag: true,
    dots: true,
    rtl: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },
    nav: false,
  };



}
