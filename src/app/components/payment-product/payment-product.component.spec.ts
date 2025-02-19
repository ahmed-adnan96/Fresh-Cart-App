import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProductComponent } from './payment-product.component';

describe('PaymentProductComponent', () => {
  let component: PaymentProductComponent;
  let fixture: ComponentFixture<PaymentProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaymentProductComponent]
    });
    fixture = TestBed.createComponent(PaymentProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
