import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgetPassService } from './../../core/services/forget-pass.service';
import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-forget-password',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PasswordModule,
  ],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  isLoad: boolean = false;
  currentEmail: string | null = '';
  constructor(
    private _Renderer2: Renderer2,
    private _formBuilder: FormBuilder,
    private _ForgetPassService: ForgetPassService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}
  ngOnInit(): void {
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
  }
  emailForm = this._formBuilder.group({
    email: ['', Validators.required],
  });
  codeForm = this._formBuilder.group({
    resetCode: ['', Validators.required],
  });
  newPasswordForm = this._formBuilder.group({
    newPassword: ['', [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  sendEmail(): void {
    let email = this.emailForm.value;
    this.currentEmail = email.email || null;
    this.isLoad = true;
    this._ForgetPassService.forgotPassword(email).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this.step1 = false;
        this.step2 = true;
        this.isLoad = false;
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.error.message);
        this.isLoad = false;
      },
    });
  }

  sendCode(): void {
    let reset = this.codeForm.value;
    this.isLoad = true;
    this._ForgetPassService.verifyCode(reset).subscribe({
      next: (res) => {
        this._ToastrService.success(res.status);
        this.step2 = false;
        this.step3 = true;
        this.isLoad = false;
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.error.message);
        this.isLoad = false;
      },
    });
  }
  reWritePassword(): void {
    // let confirm = this.newPasswordForm.value ;
    // confirm.email = this.currentEmail ;
    let confirm = { ...this.newPasswordForm.value, email: this.currentEmail };

    this.isLoad = true;

    this._ForgetPassService.resetPassword(confirm).subscribe({
      next: (res) => {
        this.isLoad = false;
        this._Router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.isLoad = false;
      },
    });
  }
  get emailControl() {
    return this.emailForm.get('email');
  }
  get codeControl() {
    return this.codeForm.get('resetCode');
  }
  get passwordControl() {
    return this.newPasswordForm.get('newPassword');
  }
}
