import { ToastrService } from 'ngx-toastr';

import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { Shipping } from 'src/app/core/interface/shipping';
import { PaymentsService } from 'src/app/core/services/payments.service';

@Component({
  selector: 'app-payment-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-product.component.html',
  styleUrls: ['./payment-product.component.scss'],
})
export class PaymentProductComponent implements OnInit {
  shipping: FormGroup;
  informShipping!: Shipping;
  categoryId: any = '';

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _PaymentsService: PaymentsService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _Router: Router
  ) {
    this.shipping = new FormGroup({
      details: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
      city: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (res) => {
        this.categoryId = res.get('id');
      },
    });
  }
  get detailsInput() {
    return this.shipping.get('details');
  }
  get phoneInput() {
    return this.shipping.get('phone');
  }
  get cityInput() {
    return this.shipping.get('city');
  }
  createShipping(obj: FormGroup) {
    return obj.value;
  }
  paymentVisa(id: string, obj: FormGroup, element: HTMLButtonElement): void {
    this.informShipping = obj.value;
    if (obj.valid) {
      this._Renderer2.setAttribute(element, 'disabled', 'true');
      this._PaymentsService.onlinePayment(id, this.informShipping).subscribe({
        next: (res) => {
          this._Renderer2.removeAttribute(element, 'disabled');
          if (res.status == 'success') {
            this._CartService.cartCountNum.next(res.numOfCartItems);
            localStorage.setItem('countProduct', '0');
            window.open(res.session.url, '_self');
          }
        },
        error: (err) => {
          console.log(err);
          this._Renderer2.removeAttribute(element, 'disabled');
        },
      });
    } else {
      this._ToastrService.error('please check all inputs are correct');
    }
  }

  paymentCash(id: string, obj: FormGroup, element: HTMLButtonElement): void {
    this.informShipping = obj.value;
    if (obj.valid) {
      this._Renderer2.setAttribute(element, 'disabled', 'true');
      this._PaymentsService.cashPayment(id, this.informShipping).subscribe({
        next: (res) => {
          this._Renderer2.removeAttribute(element, 'disabled');
          this._CartService.cartCountNum.next(res.numOfCartItems);

          localStorage.setItem('countProduct', '0');
          this._Router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
          this._Renderer2.removeAttribute(element, 'disabled');
        },
      });
    }
  }
}
