import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/app/enviroments/enviroment';
import { AlldataProducst } from '../interface/AlldataProducst';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

constructor(private _HttpClient:HttpClient) { }


getProducts(pageNumber:number = 1 ):Observable<any>{
  return this._HttpClient.get(enviroment.apiProduction+`products?page=${pageNumber}`)
}

getCategories():Observable<any>{
  return this._HttpClient.get(enviroment.apiProduction +'categories');
}
getSpecificProduct(id:string|null):Observable<any>{
  return this._HttpClient.get(enviroment.apiProduction + `products/${id}`)
}
getSpecificCategory(id:string | null):Observable<any>{
  return this._HttpClient.get(enviroment.apiProduction + `categories/${id}`)
}
getSpecificSubCategory(id:string | null):Observable<any>{
  return this._HttpClient.get(enviroment.apiProduction + `categories/${id}/subcategories`)
}


}
