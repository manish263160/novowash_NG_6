import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { ROPCService } from "../../auth/ropc.service";
import { environment } from "../../../environments/environment";

@Injectable()
export class ProfileService {
    public user: any;
    public token: any;
    public urlCommonPart = `${environment.urlHosts.main}/${environment.urlHosts.appName}`;

    constructor(
        public ropcService: ROPCService,
        private http: HttpClient
    ) {
        this.user = this.ropcService.user;
        this.token = localStorage.getItem("access_token");
    }

    public updateUserDetails(userId, username: string, email: string) {
        if (!userId && this.user) {
            userId = this.user.id;
        }
        
        let impHeaders = new HttpHeaders();
        impHeaders = impHeaders.set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${this.token}`);
        return this.http
            .put(
                `${this.urlCommonPart}/userprofile/updateUserDetails/${userId}`,
                { name: username, email: email },
                { headers: impHeaders }
            )
            .pipe(map((res: any) => {
                return res;
            }));
    }

    public updateServiceAddress(type: string, payload) {
        let impHeaders = new HttpHeaders();
        impHeaders = impHeaders.set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${this.token}`);
        return this.http
            .put(
                `${this.urlCommonPart}/userprofile/updateServiceAddress/${type}`,
                payload,
                { headers: impHeaders }
            ).pipe(map((res: any) => {
                return res;
            }));
    }

    public updateServiceDate(type: string, payload) {
        let impHeaders = new HttpHeaders();
        impHeaders = impHeaders.set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${this.token}`);
        return this.http
            .put(
                `${this.urlCommonPart}/userprofile/updateServiceDate/${type}`,
                payload,
                { headers: impHeaders }
            ).pipe(map((res: any) => {
                return res;
            }));
    }

    public insertPackageDateSlot(payload) {
        let impHeaders = new HttpHeaders();
        impHeaders = impHeaders.set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${this.token}`);
        return this.http
            .post(
                `${this.urlCommonPart}/userprofile/insertPackageDateSlot/${payload.id}`,
                payload,
                { headers: impHeaders }
            ).pipe(map((res: any) => {
                return res;
            }));
    }

    public getBookedServices(userId = null): Observable<any> {
        if (!userId && this.user) {
            userId = this.user.id;
        }
        
        let impHeaders = new HttpHeaders();
        impHeaders = impHeaders.set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${this.token}`);
        return this.http
            .get(`${this.urlCommonPart}/userprofile/getPreviousBookingService/service/${userId}`, {headers: impHeaders})
            .pipe(map((res: any) => {
                return res || [];
            }));
    }

    public getBookedPackgaes(userId = null): Observable<any> {
        if (!userId && this.user) {
            userId = this.user.id;
        }
        let impHeaders = new HttpHeaders();
        impHeaders = impHeaders.set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${this.token}`);
        return this.http
            .get(`${this.urlCommonPart}/userprofile/getPreviousBookingService/package/${userId}`, {headers: impHeaders})
            .pipe(map((res: any) => {
                return res || [];
            }));
    }
}
