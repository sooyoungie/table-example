import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
      .pipe(map((users: any) => users as any[]));
  }

  getUserDetails(userId: number): Observable<any> {
    return this.http.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
  }
}