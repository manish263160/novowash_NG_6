import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs/Observable";
import { map, combineLatest } from 'rxjs/operators';
import { User } from "../../model/user";

@Injectable()
export class UserService {
    public tokenStr: string = "access_token";
    public refreshTokenStr: string = "refresh_token";
    public redirectUrl: string;
    private _user: User;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    public login(payload: any): Observable<User> {
        localStorage.removeItem(this.tokenStr);
        localStorage.removeItem(this.refreshTokenStr);
        const headers = new HttpHeaders()
            .set("X-Requested-With", "XMLHttpRequest")
            .set("view-port", "Web");
        // return this.http
        //     .post("/api/auth/login", payload, {headers})
        //     .pipe(map((res: { token: string, refreshToken: string }) => {
        //         localStorage.setItem("token", res.token);
        //         localStorage.setItem("refreshToken", res.refreshToken);
        //         const jwtHelper = new JwtHelperService();
        //         return jwtHelper.decodeToken(res.token);
        //     }));
        this.user = new User();
        this.user.full_name = "Sample User";
        this.user.phone_number = "9090112233";
        return new Observable(observer => {
            setTimeout(() => {
                localStorage.setItem("token", "token");
                localStorage.setItem("refreshToken", "refreshToken");
                observer.next(this.user);
                observer.complete();
            },1000);
        });
    }

    public logout(flag: boolean = true): Observable<any> {
        const token = localStorage.getItem("token");
        let impHeaders = new HttpHeaders();
        impHeaders = impHeaders.set("Content-Type", "application/json")
            .set("X-Authorization", `Bearer ${token}`)
            .set("view-port", "Web");
        const tokenOb =  this.http
            .get(`/api/auth/logout`, {headers: impHeaders})
            .pipe(map((res: any) => {
                return res || {};
            }));
        // const ob = Observable.of(combineLatest(tokenOb));
        return tokenOb;
    }

    public get user(): User {
        return this._user;
    }

    public set user(user: User) {
        this._user = user;
    }

    public refreshToken(): Observable<any> {
        return this.http
            .get("/api/auth/token")
            .pipe(map((res: { token: string, refreshToken: string }) => {
                const jwtHelper = new JwtHelperService();
                const tkn = jwtHelper.decodeToken(res.token);
                const d = (new Date()).getTime();
                const diff = (tkn.exp * 1000) - d - 60000;
                setTimeout(() => {
                    this.refreshToken().subscribe((resp) => {
                        console.log("response here is::", resp);
                    }, (err) => {
                        console.log("refresh token error");
                        localStorage.removeItem("token");
                        localStorage.removeItem("refreshToken");
                        this.router.navigate(["/app/home"]);
                    });
                }, diff);
                localStorage.setItem("token", res.token);
                // this.store.dispatch(new UserActions.LoginSuccessAction(jwtHelper.decodeToken(res.token)));
                this.user = jwtHelper.decodeToken(res.token);
                return res;
            }));
    }

    public checkNumber(payload): Observable<any> {
        // return this.http
        //     .get("/api/checkNumber")
        //     .pipe(map((res: any) => {
        //         return res.content || [];
        //     }));
        return new Observable(observer => {
            setTimeout(() => {
              observer.next(true);
              observer.complete();
            },1000);
        });
    }

    public isLoggedIn(): boolean {
        const jwtHelper = new JwtHelperService();
        return !jwtHelper.isTokenExpired(localStorage.getItem("token"));
    }
    

    public getLoggedInUserInfo(): User {
        // const token = localStorage.removeItem("token");
        // const jwtHelper = new JwtHelperService();
        // return jwtHelper.decodeToken(token);
        return this.user;
    }
}
