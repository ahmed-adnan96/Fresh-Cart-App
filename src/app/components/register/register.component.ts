import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlOptions, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmPassword } from 'src/app/core/validators/confirmPassword';
import { checkEmail } from 'src/app/core/validators/EmailVaild';
import { PasswordModule } from 'primeng/password';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule  , FormsModule  , PasswordModule , MatIconModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  /*---------------- Properities--------------  */
 
  registerForm: FormGroup;
  errorMsg!:string
  isLoad:boolean = false

  constructor(private _AuthService:AuthService , private _Router:Router ) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email , checkEmail()]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/)]),
      rePassword: new FormControl('' , [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
    } , {validators : ConfirmPassword()} )
  };




get nameControl(){
   return this.registerForm.get('name')
}
get emailControl(){
  return this.registerForm.get('email')
}
get passwordControl(){
  return this.registerForm.get('password');
}
get rePasswordControl(){
  return this.registerForm.get('rePassword')
}

get phoneNumberControl(){
  return this.registerForm.get('phone')
}

createUser():void{
   const newUser =  this.registerForm.value
  this.isLoad = true;
if(this.registerForm.valid){
  this._AuthService.singUp(newUser).subscribe({
    next:(res)=>{
      this.registerForm.reset();
      this._Router.navigate(['/login'])
      this.isLoad = false ; 
    }, 
    error:(err)=>{
     this.errorMsg =  err.error.message
      this.isLoad = false
    }
  })
}



}



}
