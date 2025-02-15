import { ProductsService } from 'src/app/core/services/products.service';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule, NgxImageZoomModule, CarouselModule],
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit {
  productId!: string | null;
  rating!: number;
  productDetails: any;
  imageProduct!: OwlOptions;
  images: string[] = [];
  dataProduct: any;
  fullStarts: number[] = [];
  emptyStarts: number[] = [];
  hasHalfRating!: boolean;
  discount: number;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _Renderer2: Renderer2,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {
    this.imageProduct = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      autoplay: false,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      navSpeed: 1000,
      navText: ['', ''],
      nav: false,
      items: 1,
      mergeFit: true,
      autoplaySpeed: 5000,
    };
    this.discount = 0;
  }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (product) => {
        this.productId = product.get('id');
      },
    });
    this._ProductsService.getSpecificProduct(this.productId).subscribe({
      next: ({ data }) => {
        this.images = data.images;
        this.dataProduct = data;
        this.rating = data.ratingsAverage;
        this.counterRating();
        this.discount = data.priceAfterDiscount;
        if (this.discount == undefined) {
          this.discount = 0;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addCart(id: string, element: HTMLElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');

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
        this._Renderer2.removeAttribute(element, 'disabled');
      },
      error: (err) => {
        console.log('err cart ', err);
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }

  private counterRating(): void {
    const fullStart = Math.floor(this.rating);
    this.hasHalfRating = this.rating % 1 !== 0;
    const emptyRating = 5 - fullStart - (this.hasHalfRating ? 1 : 0);
    this.fullStarts = Array(fullStart).fill(0);
    this.emptyStarts = Array(emptyRating).fill(0);
  }
}
