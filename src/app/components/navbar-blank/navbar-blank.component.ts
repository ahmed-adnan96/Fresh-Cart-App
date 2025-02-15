import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  Router,
} from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss'],
})
export class NavbarBlankComponent implements OnInit {
  countCart: number;
  countWish!: number;
  constructor(
    private _Router: Router,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {
    this.countCart = 0;
  }

  @ViewChild('navBlank') navbarElement!: ElementRef;

  @HostListener('window:scroll')
  onscroll(): void {
    if (scrollY > 460) {
      this._Renderer2.addClass(this.navbarElement.nativeElement, 'px-4');
    } else {
      this._Renderer2.removeClass(this.navbarElement.nativeElement, 'px-4');
    }
  }

  signOut(): void {
    if (localStorage.getItem('userToken') !== null) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('countProduct');
      this._CartService.cartCountNum.next(0);
      this._Router.navigate(['/login']);
    }
  }
  ngOnInit(): void {
    this._CartService.cartCountNum$.subscribe({
      next: (res) => {
        this.countCart = res;
      },
    });
    this._WishlistService.countNumberWishList$.subscribe(
      (value) => (this.countWish = value)
    );
  }
}
