import { Component, Inject, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Iorder } from '../../../shared/interfaces/iorder';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  imports: [CommonModule],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {


  private readonly ordersService=inject(OrdersService)
  private readonly  authService=inject(AuthService);
  userId:string=''
  orders:Iorder[]=[]
ngOnInit(): void {
  this.authService.getUserData()
  this.userId=this.authService.userData.id


    this.ordersService.getAllUserOrders(this.userId).subscribe(
      {
     
        next:(res)=>{
  console.log("getAllOrders" , res);
  this.orders=res
        },
        error:(err)=>{
          console.log("getAllOrders error " , err);
  
        }
      }
    )

    
}
  
}
