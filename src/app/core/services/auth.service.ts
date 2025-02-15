import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { enviroment } from 'src/app/enviroments/enviroment';
import { NewUser } from '../interface/new-user';
import { User } from '../interface/user';
import { jwtDecode } from 'jwt-decode';
import { UserInfo } from '../interface/user-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }

  singUp(group: NewUser): Observable<NewUser> {
    return this._HttpClient.post<NewUser>(enviroment.apiProduction + enviroment.auth.signUp, group)
  }

  singIn(user:User):Observable<User>{
    return this._HttpClient.post<User>(enviroment.apiProduction + enviroment.auth.signIn , user);
  }
  updatePass(pass:object):Observable<any>{
    return this._HttpClient.put(enviroment.apiProduction +'users/changeMyPassword' , pass)
  }
   get decode() : any {
    const encode = localStorage.getItem('userToken');
    if(encode !== null){
      const decode = jwtDecode(encode);
      const userInformation : object = decode;
      return userInformation;

    }else{
      return null ; 
    }
  }

}
