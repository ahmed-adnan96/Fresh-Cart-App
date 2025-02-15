import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


      if(localStorage.getItem('userToken') !=null){
        let myToken : any = {
          token : localStorage.getItem('userToken')
        }
        if(myToken.token != localStorage.getItem('userToken')){
          myToken.token = localStorage.getItem('userToken')
        }
    

       request=  request.clone({
          setHeaders : myToken
        })

        
      }


    return next.handle(request);
  }
}
