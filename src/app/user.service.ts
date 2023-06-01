import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { UserList, User, UserResult } from './models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public atualPage: number = 0;

  private userUrl = 'https://dummyapi.io/data/v1/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'app-id': '646e39379d969f0f5863a4cb' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getUsers(mais: boolean): Observable<UserResult> {

    if (mais) {
      this.atualPage += 1
    } else {
      this.atualPage = 0;
    }

    return this.http.get<UserResult>(this.userUrl+'user?page='+this.atualPage+'&limit=50', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError<UserResult>('getUsers'))
      );
  }

  getUser(id: string): Observable<User> {
    const url = `${this.userUrl}user/${id}`;
    return this.http.get<User>(url, this.httpOptions).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  addUser (user: User): Observable<User> {
    
    return this.http.post<User>(this.userUrl+'user/create', user, this.httpOptions);
  }

  updateUser (user: User): Observable<User> {

    return this.http.put<User>(`${this.userUrl}user/${user.id}`, user, this.httpOptions).pipe(
      catchError(this.handleError<User>('updateUser'))
    );
  }

  deleteUser (user: UserList): Observable<string> {
    const url = `${this.userUrl}user/${user.id}`;

    return this.http.delete<string>(url, this.httpOptions).pipe(
      catchError(this.handleError<string>('deleteUser'))
    );
  }


  private handleError<T> (operation = 'operation') {
    return (error: any): Observable<T> => {

      // 
      console.error(operation, error); // log to console

      // Deixa o app rodando, retorno um resultado vazio
      return of({} as T);
    };
  }
}
