import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(private _HttpClient:HttpClient) { }

addAddress(informationAddress:object):Observable<any>{
  return this._HttpClient.post(enviroment.apiProduction+'addresses' , informationAddress)
}
getAllAddresses():Observable<any>{
  return this._HttpClient.get(enviroment.apiProduction +'addresses');
}
 removeAddress(id:string):Observable<any>{
  return this._HttpClient.delete(enviroment.apiProduction + `addresses/${id}`)
 }
}
