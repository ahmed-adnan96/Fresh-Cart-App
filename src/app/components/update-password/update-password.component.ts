import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmPassword } from 'src/app/core/validators/confirmPassword';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PasswordModule,
    MatIconModule,
  ],
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  updatePassword: FormGroup;
  isLoad: boolean = false;
  errorMsg: string = '';
  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {
    this.updatePassword = new FormGroup(
      {
        currentPassword: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\w{6,}$/),
        ]),
        rePassword: new FormControl('', [Validators.required]),
      },
      { validators: ConfirmPassword() }
    );
  }
  ngOnInit(): void {
    if (
      localStorage.getItem('countProduct') != null &&
      localStorage.getItem('countWishList') != null
    ) {
      let count: any = localStorage.getItem('countProduct');
      let countWish: number | null = Number(
        localStorage.getItem('countWishList')
      );
      this._CartService.cartCountNum.next(count);
      this._WishlistService.updateNumberOfWishlist(countWish);
    }
  }
  updateUserPassword(): void {
    this._AuthService.updatePass(this.updatePassword.value).subscribe({
      next: (res) => {
        this._ToastrService.success('update Passowrd ');
        localStorage.removeItem('userToken');
        this._Router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.error.errors.msg);
      },
    });
  }
  get CurrentpasswordControl() {
    return this.updatePassword.get('currentPassword');
  }
  get passwordControl() {
    return this.updatePassword.get('password');
  }
  get rePasswordControl() {
    return this.updatePassword.get('rePassword');
  }
}
