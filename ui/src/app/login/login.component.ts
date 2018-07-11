import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ValidatorService } from "../common/services/validator.service";
import { UserService } from "../core/services/user.service";
import { Observable, Subscription } from "rxjs";
import { map, delay, concatMap } from 'rxjs/operators';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "login",
    styleUrls: ["./login.component.scss"],
    templateUrl: "./login.component.html",
})

export class LoginComponent implements OnInit, OnDestroy {
    @Output() public onLoginCancelled: EventEmitter<any> = new EventEmitter();
    public loginForm: FormGroup;
    public allSubscriptions: Subscription;
    public isExistingUser: boolean;

    constructor(private fb: FormBuilder, private userService: UserService) {}

    public ngOnInit() {
        console.log("Login ngOnInit()....");
        this.initLoginForm();
    }

    public initLoginForm() {
        this.isExistingUser = false;
        this.loginForm = this.fb.group({
            number: ["", Validators.compose([Validators.required, ValidatorService.phoneValidator])],
        });
    }

    public onClickCheckNumber() {
        this.allSubscriptions = this.userService.checkNumber({number: this.loginForm.controls.number.value})
            .subscribe((val) => {
                if (val === true) {
                    this.proceedWithLogin();
                }
            })
    }
    
    public proceedWithLogin() {
        this.loginForm.addControl("otp", new FormControl("", Validators.compose([Validators.required])));
        // this.loginForm["otp"] = ["", Validators.compose([Validators.required])];
        this.isExistingUser = true;
        this.loginForm.controls.number.disable();
    }

    public onClickLogin() {}

    public goBackToOne() {
        this.isExistingUser = false;
        this.loginForm.controls.number.enable();
        this.loginForm.removeControl("otp");
    }

    public closeDialog() {
        this.onLoginCancelled.emit();
    }

    public ngOnDestroy() {
        this.allSubscriptions.unsubscribe();
    }
}