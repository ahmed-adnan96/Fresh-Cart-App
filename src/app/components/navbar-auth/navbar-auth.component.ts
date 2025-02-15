import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-auth',
  standalone: true,
  imports: [CommonModule , RouterLink , RouterLinkActive],
  templateUrl: './navbar-auth.component.html',
  styleUrls: ['./navbar-auth.component.scss']
})
export class NavbarAuthComponent {

}
