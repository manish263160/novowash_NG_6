import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";
export class ValidatorService {
    public static phoneNumberValidator(control: FormControl) {
        if (control.value && control.value.match(/^([(][987]{1})(\d{1})([\)])(\d{4})([\-])(\d{4})/)) {
            return null;
        } else {
            return { invalidPhoneNumber: true };
        }
    }

    public static phoneValidator(control: FormControl) {
        if (control && control.value) {
            const data = control.value;
            const newAr = data.split("");
            for (let i = newAr.length - 1; i >= 0; i--) {
                if (newAr[i] === "_") {
                    newAr.splice( i, 1 );
                }
            }
            if ((newAr !== "") && (newAr.length < 10)) {
                return {invalidNumber: true };
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}