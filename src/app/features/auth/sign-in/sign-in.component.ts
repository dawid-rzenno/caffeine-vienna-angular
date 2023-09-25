import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService, SignInBody } from "../auth.service";
import { AUTH_DIRECT_ROUTE, AuthDirectRouteKey } from "../../common/constants/auth-direct-route.const";

export type SignInForm = {
  login: FormControl<string>;
  password: FormControl<string>;
  rememberMe: FormControl<boolean>;
}

@Component({
  selector: 'mocha-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  readonly DirectRoute: Record<string, any> = AUTH_DIRECT_ROUTE;
  readonly DirectRouteKey = AuthDirectRouteKey;

  readonly formGroup: FormGroup<SignInForm> = new FormGroup<SignInForm>({
    login: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    rememberMe: new FormControl<boolean>(false, { validators: [Validators.required], nonNullable: true })
  });

  constructor(private authService: AuthService) {
  }

  signIn(): void {
    this.authService.signIn(
      // Button that calls this method is disabled until sign-in form is valid so additional validation is not needed
      this.formGroup.value as SignInBody
    ).subscribe();
  }

}
