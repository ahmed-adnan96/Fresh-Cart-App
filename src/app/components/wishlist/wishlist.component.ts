import { CartService } from './../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { Product } from 'src/app/core/interface/product';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipes/cuttext.pipe';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule , FormsModule , SearchPipe , RouterLink , CuttextPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  products:Product[]=[]
  term :string = '';
  wishListArr: string[] = [];
  constructor(private _WishlistService:WishlistService , private _Renderer2:Renderer2 , private _ToastrService:ToastrService ,private _CartService:CartService ){}

ngOnInit(): void {
  if (localStorage.getItem('countProduct') != null && localStorage.getItem('countWishList') !=null ) {
    let count: any = localStorage.getItem('countProduct');
    let countWish : number | null  = Number(localStorage.getItem('countWishList'))
    this._CartService.cartCountNum.next(count);
    this._WishlistService.updateNumberOfWishlist(countWish)
  }
    this._WishlistService.getProductWishlist().subscribe({
      next:(res)=>{
        this.products = res.data;
      } ,
      error:(err)=>{
        console.log(err);
      }
    })
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
      const filterAfterRemoveProductWishList = this.products.filter((item:any)=>this.wishListArr.includes(item._id) );
      this.products = filterAfterRemoveProductWishList;
      this._WishlistService.updateNumberOfWishlist(this.products.length) ; 
      localStorage.setItem('countWishList' , JSON.stringify(this.products.length))
      this._ToastrService.success(res.message);
    },
    error: (err) => {
      console.log('error remove wish', err);
    },
  });
}


}
