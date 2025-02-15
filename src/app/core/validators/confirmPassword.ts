import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


 export function ConfirmPassword():ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null =>{

        const password = control.get('password');
        const rePassword = control.get('rePassword')

        
        
        if(rePassword?.value == ''){
            return {required : true}
        } 

        if (password?.value != rePassword?.value){
            return {misMatch : true}
        } 

        return null ;


    }
}