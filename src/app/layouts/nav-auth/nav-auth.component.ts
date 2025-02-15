import { Component   } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarAuthComponent } from "../../components/navbar-auth/navbar-auth.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { slideInAnimation } from 'src/app/core/animationRouting';


@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [CommonModule, NavbarAuthComponent, RouterOutlet, FooterComponent],
  templateUrl: './nav-auth.component.html',
  styleUrls: ['./nav-auth.component.scss'] , 
  animations:[slideInAnimation]
})
export class NavAuthComponent {


}
