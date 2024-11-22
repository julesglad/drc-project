import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
  ) {
    this.loginForm = this.fb.group({
      userName: [''],
      password: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.loginService.login(this.loginForm.value.userName, this.loginForm.value.password);
  }
}
