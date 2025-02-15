import { Component } from '@angular/core';
import { slideInAnimation } from './core/animationRouting';
// import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] , 
  animations: [slideInAnimation]
  
})
export class AppComponent {
  title = 'Fresh-Card';
}
