import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ValidatorService } from "../common/services/validator.service";
import { UserService } from "../core/services/user.service";
import { Observable, Subscription } from "rxjs";
import { map } from 'rxjs/operators';
import { User } from "../model/user";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "login",
    styleUrls: ["./login.component.scss"],
    templateUrl: "./login.component.html",
})

export class LoginComponent implements OnInit, OnDestroy {
    @Output() public onLoginCancelled: EventEmitter<any> = new EventEmitter();
    @Output() public onLoginSuccessful: EventEmitter<User> = new EventEmitter();
    public loginForm: FormGroup;
    public allSubscriptions: Subscription;
    public isExistingUser: boolean;
    public isNewUser: boolean;
    public rgexString: string = "a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð";
    public namePattern = new RegExp("^[" + this.rgexString + ",.'-]+([" + this.rgexString + " ,.'-]+)*$");
    public emailPattern = "^(([^<>()\\[\\]\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\\.)+[a-zA-Z]{2,}))$";

    constructor(private fb: FormBuilder, private userService: UserService) {}

    public ngOnInit() {
        console.log("Login ngOnInit()....");
        this.initLoginForm();
    }

    public initLoginForm() {
        this.isExistingUser = false;
        this.isNewUser = false;
        this.loginForm = this.fb.group({
            number: ["", Validators.compose([Validators.required, ValidatorService.phoneValidator])],
        });
    }

    public onClickCheckNumber() {
        this.allSubscriptions = this.userService.checkNumber({number: this.loginForm.controls.number.value})
            .subscribe((val) => {
                if (val === true) {
                    this.proceedWithLogin();
                } else {
                    this.proceedWithSignup();
                }
            })
    }

    public proceedWithSignup() {
        this.loginForm.addControl("name", new FormControl("", Validators.compose([Validators.required, Validators.pattern(this.namePattern)])));
        this.loginForm.addControl("email", new FormControl("", Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])));
        this.isExistingUser = false;
        this.isNewUser = true;
    }
    
    public proceedWithLogin() {
        this.loginForm.addControl("otp", new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), , Validators.maxLength(4)])));
        this.isExistingUser = true;
        this.isNewUser = false;
        this.loginForm.controls.number.disable();
    }

    public onClickGetOTP() {

    }

    public onClickLogin() {
        const loginSub = this.userService.login({
                number: this.loginForm.controls.number.value,
                otp: this.loginForm.controls.otp.value
            }).subscribe((user) => {
                this.onLoginSuccessful.emit(user);
            })
    }

    public goBackToOne() {
        this.isExistingUser = false;
        this.isNewUser = false;
        this.loginForm.controls.number.enable();
        this.loginForm.removeControl("otp");
        this.loginForm.removeControl("name");
        this.loginForm.removeControl("email");
    }

    public closeDialog() {
        this.onLoginCancelled.emit();
    }

    public ngOnDestroy() {
        this.allSubscriptions.unsubscribe();
    }
}