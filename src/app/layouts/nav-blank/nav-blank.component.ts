import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarBlankComponent } from 'src/app/components/navbar-blank/navbar-blank.component';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-nav-blank',
  standalone: true,
imports: [CommonModule, RouterOutlet, NavbarBlankComponent, FooterComponent],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {
constructor( private _Router:Router , private _Renderer2:Renderer2){};
@ViewChild('btnScroll')  HTMLButtonElement !: ElementRef ; 

ngOnInit(): void {
 
    
}
ngAfterViewInit(): void {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  this._Renderer2.addClass(this.HTMLButtonElement.nativeElement , 'd-none')
}
@HostListener('window:scroll')
scrollUp():void{
  if(scrollY < 400 ){
    this._Renderer2.addClass(this.HTMLButtonElement.nativeElement , 'd-none')
  }
  else {
    this._Renderer2.removeClass(this.HTMLButtonElement.nativeElement , 'd-none')

  }
}
scrollToTop():void{
  window.scrollTo(0,0);
}



}
