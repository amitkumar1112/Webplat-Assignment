import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  submitted = false;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      Username: new FormControl('emilys', Validators.required),
      password: new FormControl('emilyspass', Validators.required),
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  btn_submit() {
    this.submitted = true;
    if (this.submitted && this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this._apiService
        .loginUser(loginData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          if (res) {
            localStorage.setItem('token', res?.token);
            this._route.navigate(['/profile']);
          }
        });
    }
  }
}
