import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { Category, Product } from 'src/app/core/interface/product';
import { CuttextPipe } from 'src/app/core/pipes/cuttext.pipe';
import { Subscription } from 'rxjs';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/core/services/wishlist.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CuttextPipe,
    CarouselModule,
    RouterLink,
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  countWish!: number;
  products: Product[] = [];
  categories: Category[] = [];
  cancelSubscribe!: Subscription;
  customOptions!: OwlOptions;
  staticSlide!: OwlOptions;
  term: string = '';
  wishListArr: string[] = [];
  constructor(
    private _WishlistService: WishlistService,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2
  ) {
    this.staticSlide = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      navSpeed: 1000,
      navText: ['', ''],
      nav: false,
      items: 1,
      mergeFit: true,
      animateIn: 'blurIn',
      animateOut: 'blurOut',
      autoplaySpeed: 5000,
    };
    this.customOptions = {
      mergeFit: true,
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      margin: 10,
      stagePadding: 50,
      navSpeed: 700,
      autoplaySpeed: 3000,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 2,
        },
        740: {
          items: 3,
        },
        940: {
          items: 6,
        },
      },
    };
  }
  ngOnInit(): void {
    if (localStorage.getItem('countProduct') != null) {
      let count: any = localStorage.getItem('countProduct');
      this._CartService.cartCountNum.next(count);
    }
    this._CartService.cartCountNum$.subscribe({
      next: (Res) => {},
    });

    this._ProductsService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._WishlistService.getProductWishlist().subscribe({
      next: (res) => {
        if (res.data && Array.isArray(res.data)) {
          let idWishlistProducts: string[] = res.data.map(
            (product: any) => product._id
          );
          this.wishListArr = idWishlistProducts;
          this._WishlistService.updateNumberOfWishlist(this.wishListArr.length);
          localStorage.setItem(
            'countWishList',
            JSON.stringify(this.wishListArr.length)
          );
        }
      },
    });
    this.cancelSubscribe = this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addCart(id: string, element: HTMLElement): void {
    this._Renderer2.removeClass(element, 'fa-bounce');

    this._CartService.AddToCart(id).subscribe({
      next: (res) => {
        this._CartService.cartCountNum.next(res.numOfCartItems);
        localStorage.setItem('countProduct', res.numOfCartItems);
        this._ToastrService.success(res.message, '', {
          timeOut: 3000,
          extendedTimeOut: 3000,
          easing: 'ease-in',
          progressBar: true,
          progressAnimation: 'increasing',
        });

        this._Renderer2.addClass(element, 'fa-bounce');
      },
      error: (err) => {
        console.log('err cart ', err);

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
}
