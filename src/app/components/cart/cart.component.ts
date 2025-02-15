import { CartService } from './../../core/services/cart.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cartdetails, Data, Product } from 'src/app/core/interface/cartdetails';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _WishlistService: WishlistService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2
  ) {}

  cartDetails!: Cartdetails | null;
  dataOfCart!: Data;
  productsOfCart: Product[] = [];
  idCategory!: string;
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
    this.getAllItems();
  }

  removeAllProduct(): void {
    this._CartService.DleteItems().subscribe({
      next: (res) => {
        this._ToastrService.success('Delete success ');
        this._CartService.cartCountNum.next(res.numOfCartItems);
        this.getAllItems();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeOneItem(id: string, nameProduct: string, element: HTMLElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.removeSpecificProduct(id).subscribe({
      next: (res) => {
        this._CartService.cartCountNum.next(res.numOfCartItems);
        this._ToastrService.success(`${nameProduct} deleted  `);
        this.updateProductsUi(res);
        this._Renderer2.removeAttribute(element, 'disabled');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  countOfProduct(
    count: number,
    id: string,
    btn1: HTMLElement,
    btn2: HTMLElement
  ): void {
    this._Renderer2.setAttribute(btn1, 'disabled', 'true');
    this._Renderer2.setAttribute(btn2, 'disabled', 'true');
    this._Renderer2.removeClass(btn1, 'shadow');
    this._Renderer2.removeClass(btn2, 'shadow');
    this._CartService.updateCountCart(id, count).subscribe({
      next: (res) => {
        this.updateProductsUi(res);
        this._Renderer2.removeAttribute(btn1, 'disabled');
        this._Renderer2.removeAttribute(btn2, 'disabled');
        this._Renderer2.addClass(btn1, 'shadow');
        this._Renderer2.addClass(btn2, 'shadow');
      },
      error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(btn1, 'disabled');
        this._Renderer2.removeAttribute(btn2, 'disabled');
        this._Renderer2.addClass(btn1, 'shadow');
        this._Renderer2.addClass(btn2, 'shadow');
      },
    });
  }

  private getAllItems(): void {
    this._CartService.getAllProductFromCart().subscribe({
      next: (res) => {
        this._CartService.cartCountNum.next(res.numOfCartItems);
        localStorage.setItem('countProduct', res.numOfCartItems);
        this.updateProductsUi(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateProductsUi(res: any): void {
    localStorage.setItem('countProduct', res.numOfCartItems);
    this._CartService.cartCountNum.next(res.numOfCartItems);
    this.cartDetails = res;
    this.dataOfCart = res.data;
    this.idCategory = res.cartId;
    this.productsOfCart = this.dataOfCart.products;
  }
}
