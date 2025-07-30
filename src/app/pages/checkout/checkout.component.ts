import { OrdersService } from './../../core/services/orders/orders.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  private readonly formBuilder=inject(FormBuilder)
  private readonly ordersService=inject(OrdersService)
  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly router=inject(Router)
  cardId: string= ''; // Declare it first
  checkOutForm !:FormGroup
  isLoading:boolean=false
  paymentType=signal<string>('credit')
  
  ngOnInit(): void {
    this.checkOutForm = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      city: [null, [Validators.required]],
    });

   
    this.activatedRoute.paramMap.subscribe(
      {
        next:(res)=>{
      console.log("cartId" , res);
       this.cardId=res.get('id')!
       
        },
        error:(err)=>{
          console.log("cartId error " , err);
  
        }
      }
    )
  }
  submit(){
    this.isLoading=true
    console.log(this.paymentType());
    if(this.paymentType()==='credit'){
    this.ordersService.checkOut(this.cardId,this.checkOutForm.value).subscribe(
      {
        next:(res)=>{
        console.log("checkOut" , res);
        window.open(res.session.url);
      this.isLoading=false


        },
        error:(err)=>{
          console.log("checkOut error " , err);
          this.isLoading=false

  
        }
      }
    )

    }
    else if(this.paymentType()==='cash'){
 this.ordersService.createCashashOrder(this.cardId,this.checkOutForm.value).subscribe(
      {
        next:(res)=>{
        console.log("chash" , res);
this.router.navigate(['/allorders']);
       this.isLoading=false


        },
        error:(err)=>{
          console.log("cash error " , err);
          this.isLoading=false

  
        }
      }
    )    
    }
  }


  onChange(e:any) {
  this.paymentType.set(e.target.value);
}
}
