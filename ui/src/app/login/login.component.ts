import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ValidatorService } from "../common/services/validator.service";
import { AuthConfig, OAuthService } from "angular-oauth2-oidc";
import { ROPCService } from "../auth/ropc.service";
import { UserService } from "../core/services/user.service";
import { Observable, Subscription } from "rxjs";
import { environment } from "../../environments/environment";
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

    private base = document.querySelector("base");
    private baseUrl = (this.base && this.base.href) || window.location.origin + "/";
    private authConfigPassword: AuthConfig = {
        tokenEndpoint: environment.auth.tokenUrl,
        clientId: environment.auth.clientId,
        scope: "openid profile email voucher",
        dummyClientSecret: "secret",      
        postLogoutRedirectUri: this.baseUrl + "app/home",
        redirectUri: this.baseUrl + "app/home",
        requireHttps: false,
        sessionChecksEnabled: true,
        showDebugInformation: true,
        silentRefreshRedirectUri: this.baseUrl + "app/home",
        timeoutFactor: environment.production ? 0.75 : 0.01,
        useIdTokenHintForSilentRefresh: true,
    };

    constructor(
        private fb: FormBuilder,
        private oauthService: OAuthService,
        private ropcService: ROPCService,
        private userService: UserService,
    ) {}

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
        // const loginSub = this.userService.login({
        //         number: this.loginForm.controls.number.value,
        //         otp: this.loginForm.controls.otp.value
        //     }).subscribe((user) => {
        //         this.onLoginSuccessful.emit(user);
        //     })
        this.oauthService.configure(this.authConfigPassword);
        try {
            this.ropcService.login("manish263160@gmail.com", "password").then((profile) => {
                if (profile) {
                } else {
                    console.log(profile);
                }
            });
        } catch (error /*: HttpErrorResponse*/) {
            console.log(error);
        }
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