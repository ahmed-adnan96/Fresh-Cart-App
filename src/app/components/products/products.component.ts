import { WishlistService } from 'src/app/core/services/wishlist.service';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/core/interface/product';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipes/cuttext.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, CuttextPipe, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  cancelSubscribe!: Subscription;
  pageSize: number = 0;
  currentPageNumber: number = 1;
  total: number = 0;
  wishListArr: string[] = [];
  constructor(
    private _WishlistService: WishlistService,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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
    this.cancelSubscribe = this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.pageSize = res.metadata.limit;
        this.currentPageNumber = res.metadata.currentPage;
        this.total = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._WishlistService.getProductWishlist().subscribe({
      next: (res) => {
        let idWishlistProducts: string[] = res.data.map(
          (product: any) => product._id
        );
        this.wishListArr = idWishlistProducts;
      },
    });
  }
  addCart(id: string, element: HTMLElement): void {
    this._Renderer2.removeClass(element, 'fa-bounce');

    this._CartService.AddToCart(id).subscribe({
      next: (res) => {
        this._CartService.cartCountNum.next(res.numOfCartItems);
        this._ToastrService.success(res.message, '', {
          timeOut: 3000,
          extendedTimeOut: 3000,
          easing: 'ease-in',
          progressBar: true,
          progressAnimation: 'increasing',
        });
        // this._Renderer2.removeAttribute(element , 'disabled')
        this._Renderer2.addClass(element, 'fa-bounce');
      },
      error: (err) => {
        console.log('err cart ', err);
        // this._Renderer2.removeAttribute(element , 'disabled')
        this._Renderer2.addClass(element, 'fa-bounce');
      },
    });
  }
  addToWish(id: string): void {
    this._WishlistService.AddProductToWishList(id).subscribe({
      next: (res) => {
        this.wishListArr = res.data;

        this._WishlistService.updateNumberOfWishlist(this.wishListArr.length);
        localStorage.setItem(
          'countWishList',
          JSON.stringify(this.wishListArr.length)
        );
        this._ToastrService.success(res.message);
      },
      error: (err) => {
        console.log('errwish ', err);
      },
    });
  }
  removeWish(id: string): void {
    this._WishlistService.removeProductWishlist(id).subscribe({
      next: (res) => {
        this.wishListArr = res.data;
        this._WishlistService.updateNumberOfWishlist(this.wishListArr.length);
        localStorage.setItem(
          'countWishList',
          JSON.stringify(this.wishListArr.length)
        );

        this._ToastrService.success(res.message);
      },
      error: (err) => {
        console.log('error remove wish', err);
      },
    });
  }
  ngOnDestroy(): void {
    this.cancelSubscribe.unsubscribe();
    this.products = [];
  }

  pageChanged(ev: any): void {
    this.cancelSubscribe = this._ProductsService.getProducts(ev).subscribe({
      next: (res) => {
        this.products = res.data;
        this.pageSize = res.metadata.limit;
        this.currentPageNumber = res.metadata.currentPage;
        this.total = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
