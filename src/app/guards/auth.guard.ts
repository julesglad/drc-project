import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const loginService = new LoginService(http, router);

  if (loginService.isAuthenticated()) {
    return true;
  } else {
    window.location.href = '/login';
    return false;
  }
};
