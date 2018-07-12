import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { User } from "../../model/user";

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {
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

    public login(payload: any): Observable<User> {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        // return this.http
        //     .post("/api/auth/login", payload)
        //     .pipe(map((res: { token: string, refreshToken: string }) => {
                // localStorage.setItem("token", res.token);
                // localStorage.setItem("refreshToken", res.refreshToken);
                // const jwtHelper = new JwtHelperService();
                // return jwtHelper.decodeToken(res.token);
        //     }));
        const user = new User();
        user.full_name = "Sample User";
        user.phone_number = "9090112233";
        return new Observable(observer => {
            setTimeout(() => {
                localStorage.setItem("token", "token");
                localStorage.setItem("refreshToken", "refreshToken");
                observer.next(user);
                observer.complete();
            },1000);
        });            
    }

    public getLoggedInUserInfo(): User {
        // const token = localStorage.removeItem("token");
        // const jwtHelper = new JwtHelperService();
        // return jwtHelper.decodeToken(token);
        const user = new User();
        user.full_name = "Sample User";
        user.phone_number = "9090112233";
        return user;
    }

    public isLoggedIn(): boolean {
        const token = localStorage.removeItem("token");
        return token ? true : false;
    }
}
