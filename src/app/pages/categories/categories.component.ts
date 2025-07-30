
import { CategoriesService } from '../../core/services/Categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { Icategory } from '../../shared/interfaces/icategory';
@Component({
  selector: 'app-categories',
  imports: [   ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{


  // declarations 
  private readonly categoriesService=inject(CategoriesService)
  AllCategorys:Icategory[]=[]



 ngOnInit(): void {
  this.categoriesService.getCategories().subscribe(
    {
      next:(res)=>{
      this.AllCategorys=res.data;
      }
    }
  )

 }






}
