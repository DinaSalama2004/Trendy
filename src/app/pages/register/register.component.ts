import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router , RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule ,RouterLink ,TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)

  isValid:boolean=false
  isLoading:boolean=false
  errorMessag:string=''
  registerForm:FormGroup=new FormGroup(
    {
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]),
      password: new FormControl(null, [Validators.required, Validators.pattern("^[A-Za-z]{6}$")]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern("^01[0125][0-9]{8}$")]),
    },
    {
      // to put in array prefered so if i wanr another validators func
      validators: [this.matchPasswords] 
    }
  )
  
  matchPasswords(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
  
    if (password === rePassword) {
      return null;
    }
  
    // return error 
    return { misMatch: true };
  }
  
  //  alert show 

  getErrorMessage(controlName: string, message?: string  , language:string='en'): string | null {
    const control = this.registerForm.get(controlName);
  
 
    if (controlName === 'rePassword' && this.registerForm.errors?.['misMatch'] && control?.touched) {

      
      return 'Confirmed password does not match password.';
    }
  
    if (!control || !control.errors || !control.touched) return null;
  
    if (control.errors['required']) return 'This field is required.';
    if (control.errors['minlength']) return `Minimum ${control.errors['minlength'].requiredLength} characters.`;
    if (control.errors['maxlength']) return `Maximum ${control.errors['maxlength'].requiredLength} characters.`;
    if (control.errors['email']) return 'Please enter a valid email.';
    if (control.errors['pattern']) return message ?? 'Invalid format.';
  
    return null;
  }
  
getError(controlName: string, errorName: string): boolean {
  const control = this.registerForm.get(controlName);
  return !!(control?.getError(errorName) && control?.touched);
}

   // call api  
  submit() {
this.isLoading=true
if(this.registerForm.valid){

  this.authService.signUp(this.registerForm.value).subscribe({
     
    next:(res)=>{
  
          console.log("register" , res.message);
          this.isLoading=false
          this.isValid=true;
          
          // 1- save token in local Storage 

          localStorage.setItem("token" , res.token);
          
          setTimeout(() => {
          this.router.navigate(["home"])
            
          }, 2000);
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

    this.registerForm.markAllAsTouched()
}}


    


}
