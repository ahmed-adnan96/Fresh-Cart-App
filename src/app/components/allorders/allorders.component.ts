import { CartItem, Ordering } from './../../core/interface/ordering';
import { AuthService } from 'src/app/core/services/auth.service';
import { MyOrderService } from './../../core/services/my-order.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./allorders.component.scss'],
})
export class AllordersComponent implements OnInit {
  constructor(
    private _MyOrderService: MyOrderService,
    private _AuthService: AuthService
  ) {}
  allDetailsOrder: Ordering[] = [];
  productsOrder: CartItem[] = [];
  products: any;
  ngOnInit(): void {
    const idUser: string = this._AuthService.decode.id;

    this._MyOrderService.getMyOrder(idUser).subscribe({
      next: (res) => {
        this.allDetailsOrder = res;
        this.productsOrder = this.allDetailsOrder.flatMap(
          (order) => order.cartItems
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
