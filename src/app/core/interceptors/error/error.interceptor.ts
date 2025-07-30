import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../services/toastr/toast.service';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
let toast=inject(ToastService)


  return next(req).pipe( catchError( (err)=>{  
    if (!router.url.includes('/login') && !router.url.includes('/register')) {
      toast.error(err.error?.message || 'Something went wrong!');
    }    return throwError( ()=>err)
   }   ))
  ;
};
