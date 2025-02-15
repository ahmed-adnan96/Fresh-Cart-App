import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviroment } from 'src/app/enviroments/enviroment';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

myToken : any = {
  token : localStorage.getItem('userToken')
}
checkToken():void{
  if(this.myToken.token != localStorage.getItem('userToken')){
    this.myToken.token = localStorage.getItem('userToken')
  }else {
    console.log('this is match' , this.myToken)
  }
  }
cartCountNum : BehaviorSubject<number> = new BehaviorSubject(0);

cartCountNum$ = this.cartCountNum.asObservable();

  constructor(private _HttpClient:HttpClient) {
  
   }
  AddToCart(id:string):Observable<any>{
    return this._HttpClient.post(enviroment.apiProduction + 'cart', {
      productId : id
    })
  }
  getAllProductFromCart():Observable<any>{
    return this._HttpClient.get(enviroment.apiProduction + 'cart' )
  }
 DleteItems():Observable<any>{
  return this._HttpClient.delete(enviroment.apiProduction + 'cart' )
 }

removeSpecificProduct(id:string):Observable<any>{
  return this._HttpClient.delete(enviroment.apiProduction + 'cart'+ '/' + id )
}

updateCountCart(idProduct:string , countNumb : Number):Observable<any>{
  return this._HttpClient.put(enviroment.apiProduction + `cart/${idProduct}` , {
    count : countNumb
  }  )
}



}
