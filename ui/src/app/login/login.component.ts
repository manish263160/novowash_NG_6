import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidatorService } from "../common/services/validator.service";
import { Observable, Subscription } from "rxjs";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "login",
    styleUrls: ["./login.component.scss"],
    templateUrl: "./login.component.html",
})

export class LoginComponent implements OnInit, OnDestroy {
    @Output() public onLoginCancelled: EventEmitter<any> = new EventEmitter();
    public loginForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.initLoginForm();
    }

    public ngOnInit() {
        console.log("Login ngOnInit()....");
    }

    public initLoginForm() {
        this.loginForm = this.fb.group({
            number: ["", Validators.compose([Validators.required, ValidatorService.phoneValidator])],
        });
    }

    public onClickCheckNumber() {}

    public closeDialog() {
        this.onLoginCancelled.emit();
    }

    public ngOnDestroy() {}
}