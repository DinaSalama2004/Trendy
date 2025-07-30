import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from 'rxjs';
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
if(req.method==='GET'){
  let ngxSpinnerService=inject(NgxSpinnerService)
  ngxSpinnerService.show()
    return next(req).pipe( finalize(()=>{ ngxSpinnerService.hide()  })
  );
}
  return next(req)

};
