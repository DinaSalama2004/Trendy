import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  , ReactiveFormsModule} from '@angular/forms';
import { ForgotPassService } from '../../../core/services/ForgotPassword/forgot-pass.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-forrgot-pass',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './forrgot-pass.component.html',
  styleUrl: './forrgot-pass.component.scss'
})
export class ForrgotPassComponent {


  private readonly forgotPassService=inject(ForgotPassService)
  private readonly router=inject(Router)
  successMessage:string |null=null
  errorMessage:string |null=null
  step=1;
  isLoading:boolean=false




// function call api 


forgetPass(): void {
  this.successMessage = null;
  this.errorMessage= null;
  this.isLoading = true;

  this.forgotPassService.forgotPassword(this.forgotPasswordForm.value).subscribe({
    next: (res) => {
      console.log("forgotPassword", res);
      this.isLoading = false;
      this.successMessage = res.message;

      // add email in reset form 
      this.resetPasswordForm.patchValue({
        email: this.forgotPasswordForm.value.email
      });
      
      setTimeout(() => {
        this.step = 2;
        this.successMessage = null;
      }, 1500);
    },

    error: (err) => {

      this.isLoading = false;
      console.log("forgotPassword error", err);
      this.isLoading = false;
      this.errorMessage = err.error.message;
    }
  });
}


verifyPass():void{
  this.successMessage = null;
  this.errorMessage= null;
  this.isLoading = true;

  this.forgotPassService.VerifyResetCode(this.VerifyResetCodeForm.value).subscribe(


    {
      next:(res)=>{
        console.log("verify pass" , res);
        this.successMessage=res.message
        this.step=3;
        this.isLoading=false
      console.log(res);
      
        setTimeout(() => {
          this.step = 3;
          this.successMessage = null;
        }, 1500);
        
      },

      error:(err)=>{
        console.log("verify pass error message " , err.error.message);
        this.errorMessage=err.error.message
        this.isLoading = false;
        
      }
    }
  )
}

resetPass():void{
  this.successMessage = null;
  this.errorMessage= null;
  this.isLoading = true;

  this.forgotPassService.resetPassword(this.resetPasswordForm.value).subscribe(


    {
      next:(res)=>{
        console.log("reset pass" , res);
        this.isLoading=false
        this.successMessage="the password has been changed successfly "

     
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['/home'])
          }, 1500);
       
      },

      error:(err)=>{
        console.log("reset pass error message" , err.error.message);
        this.errorMessage=err.error.message
        this.isLoading = false;
        
      }
    }
  )
}






// forms 
  forgotPasswordForm:FormGroup=new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]),

    }
  )

  VerifyResetCodeForm:FormGroup=new FormGroup(
    {
      resetCode: new FormControl(null, [Validators.required]),
  
    }
  )

  resetPasswordForm:FormGroup=new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]),
      newPassword: new FormControl(null, [Validators.required]),

    }
  )















  

}
