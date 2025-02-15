import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPassService {

  constructor( private _HttpClient:HttpClient) { }

  
forgotPassword(email:object):Observable<any>{
  return this._HttpClient.post(enviroment.apiProduction + enviroment.auth.forgetPass, email );
}
verifyCode(code:object):Observable<any>{
  return this._HttpClient.post(enviroment.apiProduction + enviroment.auth.verifyCode , code )
}
resetPassword(resPass:object):Observable<any>{
  return this._HttpClient.put(enviroment.apiProduction + enviroment.auth.resetPass , resPass);
}

}
