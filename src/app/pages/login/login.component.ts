import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

import { FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router , RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule ,RouterLink  , TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {


  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)

  isValid:boolean=false
  isLoading:boolean=false
  errorMessag:string=''
 logginForm:FormGroup=new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]),
      password: new FormControl(null, [Validators.required, Validators.pattern("^[A-Za-z]{6}$")]),

    }
  )
  

  
  //  alert show 

  getErrorMessage(controlName: string, message?: string): string | null {
    const control = this.logginForm.get(controlName);
    if (!control || !control.errors || !control.touched) return null;
    if (control.errors['required']) return 'This field is required.';
    if (control.errors['pattern']) return message ?? 'Invalid format.';
    return null;
  }
  
getError(controlName: string, errorName: string): boolean {
  const control = this.logginForm.get(controlName);
  return !!(control?.getError(errorName) && control?.touched);
}

   // call api  
  submit() {
this.isLoading=true
if(this.logginForm.valid){

  this.authService.signIn(this.logginForm.value).subscribe({
     
    next:(res)=>{
  
         console.log("login" , res);
          // console.log("token", JSON.stringify(res.token)); 
          console.log("token from res ", res.token); // will force string


          this.isLoading=false
          this.isValid=true;

          // 1- save token in local Storage 


          // 2- decode user data 

          localStorage.setItem("token" , res.token);
          this.authService.getUserData();
          //3- navigate to home 
          setTimeout(() => {
          this.router.navigate(["/home"])
         
          }, 1000);
      },
      error:(err)=>{
        this.isLoading=false
        this.isValid=false;
        this.errorMessag  = err.error.message

        
      }
    }
  )

  


}
else{
    this.isValid=false;
    this.isLoading=false;

    this.logginForm.markAllAsTouched()
}}


    


}
