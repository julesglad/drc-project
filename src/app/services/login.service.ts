import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  login(userName: string, password: string): boolean {
    if (userName === 'user' && password === 'password') {
      const fakeToken = 'thisismyfaketoken';
      sessionStorage.setItem('token', fakeToken);
      this.router.navigate(['/quiz']);
      return true;
    } else {
      sessionStorage.removeItem('token');
      return false;
    }
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
