import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviroment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private countNumberWishList : BehaviorSubject<number>= new BehaviorSubject(0) ;
  countNumberWishList$ = this.countNumberWishList as Observable<number>;
  constructor(private _HttpClient:HttpClient){}

AddProductToWishList(prodId:string):Observable<any>{
  return this._HttpClient.post(enviroment.apiProduction+'wishlist' , {
    productId:prodId
  })
}
getProductWishlist():Observable<any>{
  return this._HttpClient.get(enviroment.apiProduction + 'wishlist')
}
removeProductWishlist(id:string):Observable<any>{
  return this._HttpClient.delete(enviroment.apiProduction + `wishlist/${id}`)
}
updateNumberOfWishlist(count :number){
  this.countNumberWishList.next(count);
}
}
