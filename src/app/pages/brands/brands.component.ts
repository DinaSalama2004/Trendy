import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrand } from '../../shared/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{


  // declarations 

  private readonly brandsService=inject(BrandsService)
  AllBrands:Ibrand[]=[]



 ngOnInit(): void {
  this.brandsService.getBrands().subscribe(
    {
      next:(res)=>{
      this.AllBrands=res.data;
      }
    }
  )

 }

}