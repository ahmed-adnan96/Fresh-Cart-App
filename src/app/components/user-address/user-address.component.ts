import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddressesService } from 'src/app/core/services/addresses.service';
import { Adress } from 'src/app/core/interface/adress';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-user-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule],
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
})
export class UserAddressComponent implements OnInit {
  userName: string = '';
  userAddresses: FormGroup;
  addresses: Adress[] = [];

  constructor(
    private _AuthService: AuthService,
    private _AddressesService: AddressesService,
    private _ToastrService: ToastrService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {
    this.userAddresses = new FormGroup({
      name: new FormControl('', [Validators.required]),
      details: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    });
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
    this.userName = this._AuthService.decode.name;
    this._AddressesService.getAllAddresses().subscribe({
      next: (res) => {
        this.addresses = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addAddress(): void {
    if (this.userAddresses.valid) {
      this._AddressesService.addAddress(this.userAddresses.value).subscribe({
        next: (res) => {
          this._ToastrService.success(res.message);
          this.addresses = res.data;
          this.userAddresses.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  deletAddress(id: string): void {
    this._AddressesService.removeAddress(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this.addresses = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
