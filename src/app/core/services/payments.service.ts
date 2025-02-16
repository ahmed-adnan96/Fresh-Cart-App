import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  myToken : any = {
    token : localStorage.getItem('userToken')
  }
  constructor(private _HttpClient:HttpClient) { }
  checkToken():void{
    if(this.myToken.token != localStorage.getItem('userToken')){
      this.myToken.token = localStorage.getItem('userToken')
    }else {
      console.log('this is match' , this.myToken)
    }
    }

    // cash payment 

    cashPayment(id:string , userInform : object):Observable<any>{
      return this._HttpClient.post(enviroment.apiPayment + `api/v1/orders/${id}` , {
        shippingAddress : userInform
      } )
    }

    // visa payment 

    onlinePayment(id:string , userInform : object ):Observable<any>{
      return this._HttpClient.post(enviroment.apiPayment + `api/v1/orders/checkout-session/${id}?url=https://fresh-cart-app-seven.vercel.app/` , {
        shippingAddress : userInform
      } )
    }
    // onlinePayment(id:string , userInform : object ):Observable<any>{
    //   return this._HttpClient.post(enviroment.apiPayment + `api/v1/orders/checkout-session/${id}?url=https://fresh-cart-app-seven.vercel.app/` , {
    //     shippingAddress : userInform
    //   } )
    // }







}
