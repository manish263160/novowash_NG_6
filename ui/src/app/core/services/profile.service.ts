import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { ROPCService } from "../../auth/ropc.service";

@Injectable()
export class ProfileService {
    public user: any;
    constructor(
        public ropcService: ROPCService,
        private http: HttpClient
    ) {
        this.user = this.ropcService.user;
    }

    public getBookedServices(userId = null): Observable<any> {
        if (!userId && this.user) {
            userId = this.user.id;
        }
        
        const token = localStorage.getItem("access_token");
        let impHeaders = new HttpHeaders();
        impHeaders = impHeaders.set("Content-Type", "application/json")
            .set("X-Authorization", `Bearer ${token}`)
            .set("view-port", "Web");
        return this.http
            .get(`http://13.59.141.30:8080/NovoWash/userprofile/getPreviousBookingService/service/${userId}`, {headers: impHeaders})
            .pipe(map((res: any) => {
                return res.data || [];
            }));
    }

    public getBookedPackgaes(userId = null): Observable<any> {
        if (!userId && this.user) {
            userId = this.user.id;
        }
        const token = localStorage.getItem("access_token");
        let impHeaders = new HttpHeaders();
        impHeaders = impHeaders.set("Content-Type", "application/json")
            .set("X-Authorization", `Bearer ${token}`)
            .set("view-port", "Web");
        return this.http
            .get(`http://13.59.141.30:8080/NovoWash/userprofile/getPreviousBookingService/package/${userId}`, {headers: impHeaders})
            .pipe(map((res: any) => {
                return res.data || [];
            }));
    }
}
