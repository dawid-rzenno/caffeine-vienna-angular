import {AbstractControl, UntypedFormControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function controlValueMatches(controlA: UntypedFormControl): ValidatorFn {
  return (controlB: AbstractControl): ValidationErrors | null => {
    const valueA = JSON.stringify(controlA.value)
    const valueB = JSON.stringify(controlB.value)
    return valueA === valueB ? null : {valuesDifferent: true};
  }
}
