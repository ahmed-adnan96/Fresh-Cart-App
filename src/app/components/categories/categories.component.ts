import { ProductsService } from 'src/app/core/services/products.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from 'src/app/core/interface/category';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}
  categories: Category[] = [];
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
    this._ProductsService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
