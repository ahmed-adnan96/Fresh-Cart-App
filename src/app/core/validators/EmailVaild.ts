import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function checkEmail(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        const email = control.value;
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email && !regex.test(email)) {
            return { misEmail: true }
        }
        return null
    }


}