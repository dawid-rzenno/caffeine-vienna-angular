import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";

export type SignUpBody = {
  email: string;
  password: string;
}

export type SignInBody = SignUpBody & {
  rememberMe: boolean;
};

@Injectable()
export class AuthService {
  private readonly resourceUrl: string = 'api/auth/';

  constructor(private httpClient: HttpClient) {
  }

  private _authorizationToken: string | undefined = undefined;

  get authorizationToken(): string {
    return this._authorizationToken || '';
  }

  signIn(body: SignInBody): Observable<any> {
    return this.httpClient.post<string>(this.resourceUrl + 'sign-in', body).pipe(
      tap((token: string) => this._authorizationToken = token),
      catchError(this.catchError)
    );
  }

  signOut(): Observable<any> {
    return this.httpClient.post(this.resourceUrl + 'sign-out', undefined).pipe(
      tap(() => this._authorizationToken = undefined),
      catchError(this.catchError)
    );
  }

  signUp(body: SignUpBody): Observable<any> {
    return this.httpClient.post(this.resourceUrl + 'sign-up', body).pipe(
      catchError(this.catchError)
    );
  }

  private catchError(error: any): Observable<any> {
    return of(error)
  }
}
