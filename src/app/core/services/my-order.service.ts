import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MyOrderService {

  constructor(private _HttpClient:HttpClient) { }

getMyOrder(idUser:string):Observable<any>{
return this._HttpClient.get(enviroment.apiProduction +`orders/user/${idUser}`)
}


}
