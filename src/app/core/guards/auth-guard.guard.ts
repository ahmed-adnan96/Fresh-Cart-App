import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const toast = inject(ToastrService); 
  if(localStorage.getItem('userToken') !== null){
    return true;
  } else{
    toast.error('Please Login First ' ,  "" ,  { timeOut:3000})
    _Router.navigate(['/login']);
    return false 
  }
};
