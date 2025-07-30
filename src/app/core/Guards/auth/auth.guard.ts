import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const pLATFORM_ID=inject(PLATFORM_ID)

  if(isPlatformBrowser(pLATFORM_ID) && localStorage.getItem('token')!==null){
    return true;

  }
  else{
   let router =  inject( Router)
   router.navigate(["/login"])
    return false ; 
  }
};
