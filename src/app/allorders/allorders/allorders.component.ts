
import { Component, inject, OnInit } from '@angular/core';
import { Iorder } from '../../shared/interfaces/iorder';
import { OrdersService } from '../../core/services/orders/orders.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-allorders',
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {


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


