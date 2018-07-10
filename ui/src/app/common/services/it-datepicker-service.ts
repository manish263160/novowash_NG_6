import { Injectable } from "@angular/core";

@Injectable()
export class ITDatepickerService {

    // required to make sure datepicker toggles on input focus
    public onDatePickerFocus(event) {
        if (event) {
            const inputEl = event.srcElement || event.target;
            if (inputEl) {
                const parentEl = inputEl.closest(".mat-form-field");
                if (parentEl) {
                    const btnEl = parentEl.getElementsByClassName("mat-datepicker-toggle")[0];
                    if (btnEl) {
                        btnEl.click();
                    }
                }
            }
        }
    }

}
