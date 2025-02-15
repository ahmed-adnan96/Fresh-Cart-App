import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { checkEmail } from 'src/app/core/validators/EmailVaild';
import { PasswordModule } from 'primeng/password';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PasswordModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginUSer: FormGroup;
  errorMsg!: string;
  isLoad: boolean = false;
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _CartService: CartService
  ) {
    this.loginUSer = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        checkEmail(),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w{6,}$/),
      ]),
    });
  }

  get emailControl() {
    return this.loginUSer.get('email');
  }
  get passwordControl() {
    return this.loginUSer.get('password');
  }

  loginUser() {
    this.isLoad = true;
    if (this.loginUSer.valid) {
      this._AuthService.singIn(this.loginUSer.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            localStorage.setItem('userToken', res.token);
            this._CartService.checkToken();
            this.getCountOfProductCart();
            this._Router.navigate(['/home']);
            this.isLoad = false;
          }
        },
        error: (err) => {
          this.errorMsg = err.error.message;
          this.isLoad = false;
        },
      });
    }
  }

  private getCountOfProductCart(): void {
    this._CartService.getAllProductFromCart().subscribe({
      next: (res) => {
        this._CartService.cartCountNum.next(res.numOfCartItems);
        localStorage.setItem('countProduct', res.numOfCartItems);
      },
    });
  }
}
