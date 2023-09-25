import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService, SignUpBody } from "../auth.service";
import { controlValueMatches } from "./common/control-value-matches.function";
import { AUTH_DIRECT_ROUTE, AuthDirectRouteKey } from "../../common/constants/auth-direct-route.const";

export type SignUpForm = {
  email: FormControl<string>;
  username: FormControl<string>;
  displayName: FormControl<string>;
  password: FormControl<string>;
  passwordConfirmation: FormControl<string>;
}

@Component({
  selector: 'mocha-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  readonly DirectRoute: Record<string, any> = AUTH_DIRECT_ROUTE;
  readonly DirectRouteKey = AuthDirectRouteKey;

  readonly passwordConfirmationControl: FormControl<string> = new FormControl<string>('', {
    validators: [Validators.required],
    nonNullable: true
  });
  readonly formGroup: FormGroup<SignUpForm> = this.getFormGroup();

  constructor(private authService: AuthService) {
  }

  signUp(): void {
    this.passwordConfirmationControl.disable();
    this.authService.signUp(
      // Button that calls this method is disabled until sign-up form is valid so additional validation is not needed
      this.formGroup.value as SignUpBody
    ).subscribe();
    this.passwordConfirmationControl.enable();
  }

  private getFormGroup(): FormGroup<SignUpForm> {
    const formGroup: FormGroup<SignUpForm> = new FormGroup<SignUpForm>({
      email: new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      username: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      displayName: new FormControl<string>('', { nonNullable: true }),
      password: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      passwordConfirmation: this.passwordConfirmationControl
    });

    const passwordControl: FormControl<string> = formGroup.get('password') as FormControl<string>;
    const passwordConfirmationControl: FormControl<string> = formGroup.get('passwordConfirmation') as FormControl<string>;

    if (passwordControl && passwordConfirmationControl) {
      passwordConfirmationControl.addValidators(
        controlValueMatches(passwordControl)
      )
    }

    return formGroup;
  }
}
