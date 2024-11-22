import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar) {}  
   

  getQuiz() {
    return this.http.get(`${this.apiUrl}/quiz`);
  }

  submitQuiz(data: any) {
    return this.http.put(`${this.apiUrl}/quiz/1`, 
      data
    );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
