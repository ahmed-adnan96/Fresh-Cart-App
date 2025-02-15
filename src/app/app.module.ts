import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AllordersComponent } from './components/allorders/allorders.component';
import { MyHttpInterceptor } from './core/interceptors/my-http.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FooterComponent,
    BrowserAnimationsModule,
    ButtonModule,
    HttpClientModule,
    NgxSpinnerModule,
  ],
  providers: [
    provideToastr(),
    provideAnimations(),
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
    {provide : HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi : true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
