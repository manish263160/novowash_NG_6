import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
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
    @Input() public isForBooking: boolean;
    @Input() public selectedServiceName: string;
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

    private otpRes = {
        data: "",
        description: "",
        message: "",
        status: "",
        statusCode: 0,
    };

    constructor(
        private fb: FormBuilder,
        private oauthService: OAuthService,
        private ropcService: ROPCService,
        private userService: UserService,
        public snackBar: MatSnackBar,
    ) {}

    public ngOnInit() {
        console.log("Login ngOnInit()....");
        this.initLoginForm();
        this.otpRes = {
            data: "",
            description: "",
            message: "",
            status: "",
            statusCode: 0,
        };
    }

    public initLoginForm() {
        this.isExistingUser = false;
        this.isNewUser = false;
        this.loginForm = this.fb.group({
            number: ["", Validators.compose([Validators.required, ValidatorService.phoneValidator])],
        });
    }

    public proceedWithSignup() {
        this.loginForm.addControl("name", new FormControl("", Validators.compose([Validators.required, Validators.pattern(this.namePattern)])));
        this.loginForm.addControl("email", new FormControl("", Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])));
        this.isExistingUser = false;
        this.isNewUser = true;
    }
    
    public proceedWithLogin() {
        this.loginForm.addControl("otp", new FormControl("", Validators.compose([Validators.required, Validators.minLength(6), , Validators.maxLength(6)])));
        this.isExistingUser = true;
        this.isNewUser = false;
        this.loginForm.controls.number.disable();
    }

    public onClickGetOTP() {
        this.allSubscriptions = this.ropcService.getOTP(this.loginForm.controls.number.value)
            .subscribe((res) => {
                Object.assign(this.otpRes, res);
                if (this.otpRes.statusCode === 200 && this.otpRes.status.toLowerCase() === "success") {
                    this.openSnackBar("OTP sent successfully", "success");
                    this.proceedWithLogin();
                } else {
                    this.openSnackBar("Something went wrong. Please try again.", "error");
                }
            });
    }

    public onClickLogin() {
        this.oauthService.configure(this.authConfigPassword);
        const loginSub = this.ropcService.login(this.loginForm.controls.number.value, this.loginForm.controls.otp.value)
            .subscribe((res) => {
                this.onLoginSuccessful.emit(res)
            });
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
        if (this.allSubscriptions) {            
            this.allSubscriptions.unsubscribe();
        }
    }

    public openSnackBar(message: string, panelClass:string = "", action: string = "") {
        this.snackBar.open(message, action, {
          duration: 2000,
          panelClass: panelClass,
        });
    }
}