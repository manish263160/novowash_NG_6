import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { Service } from "../../model/service";
import { Payment } from "../../model/payment";
import { environment } from "../../../environments/environment";

@Injectable()
export class ServicesService {
    public urlCommonPart = `${environment.urlHosts.main}/${environment.urlHosts.appName}`;
    public urlCommonPartSec = `${environment.urlHosts.secondary}/${environment.urlHosts.appName}`;
    constructor(private http: HttpClient) {
    }

    public getServices(): Observable<any> {
        return this.http
            // .post(`${this.urlCommonPartSec}/services/get/category`, {})
            .get(`${this.urlCommonPart}/services/get/category`)
            .pipe(map((res: any) => {
                return res.data || [];
            }));
    }

    public getSubServices(serviceId): Observable<any> {
        return this.http
            .post(`${this.urlCommonPartSec}/services/get/${serviceId}`, {})
            .pipe(map((res: any) => {
                return res.data || [];
            }));
    }

    public getAllSubServices(): Observable<any> {
        return this.http
            .get(`${this.urlCommonPart}/services/getAllServices`)
            .pipe(map((res: any) => {
                return res.data || [];
            }));
    }

    public getCostByServiceID(serviceId): Observable<any> {
        return this.http
            .get(`${this.urlCommonPart}/services/get/cost/${serviceId}`)
            .pipe(map((res: any) => {
                return res.data || [];
            }));
    }

    public getDateTimeSlots(serviceId): Observable<any> {
        return this.http
            .get(`${this.urlCommonPart}/services/get/serviceDateTime/${serviceId}`)
            .pipe(map((res: any) => {
                return res.data || {};
            }));
    }

    public sendPaymentStatus(payload) {
        return this.http
            .post(`${this.urlCommonPart}/payment/details`, payload)
            .pipe(map((res: any) => {
                return res.data || {};
            }));
    }

    public getPaymentUrl(payload) {
        return this.http
            .post(`${this.urlCommonPart}/payment/paymentRequest`, payload)
            .pipe(map((res: any) => {
                return res.data || {};
            }));
    }

    public getPackagePaymentUrl(payload) {
        return this.http
            .post(`${this.urlCommonPart}/payment/paymentRequestPackage`, payload)
            .pipe(map((res: any) => {
                return res.data || {};
            }));
    }

    public registerForHelp(payload) {
        const url = 
            `${this.urlCommonPart}/permitall/insertPotentialUser?name=${payload.name}&email=&phone=${payload.number}`;
        return this.http
            .put(encodeURI(url), {})
            .pipe(map((res: any) => {
                return res.data || {};
            }));
    }

    public getPackages(): Observable<any> {
        return this.http
            .get(`${this.urlCommonPart}/permitall/packages/category`)
            .pipe(map((res: any) => {
                return res.data || {};
            }));
    }

    public getPackageItems(packageId): Observable<any> {
        return this.http
            .get(`${this.urlCommonPart}/permitall/packages/getpackages/${packageId}`)
            .pipe(map((res: any) => {
                return res.data || {};
            }));
    }

    public getPackageCost(packageId): Observable<any> {
        return this.http
            .get(`${this.urlCommonPart}/permitall/packages/getpackagecost/${packageId}`)
            .pipe(map((res: any) => {
                return res.data || {};
            }));
    }

    public getCouponValidity(couponCode): Observable<any> {
        return this.http
            .get(`${this.urlCommonPart}/payment/getCouponValidity/${couponCode}`)
            .pipe(map((res: any) => {
                return res.data || {};
            }))
            .catch(err => {
                debugger;
                throw err;
            })
            
    }

    public getService(id): Observable<Service> {
        // return this.http
        //     .get(`/api/getService?id=${id}`)
        //     .pipe(map((res: any) => {
        //         return res.content || {};
        //     }));

        let service: Service = {
            id: Math.ceil(Math.random() * 10),
            name: "Service Name",
            postedOn: new Date(),
            serviceOn: new Date(),
            technician: {
                id: 101,
                imgSrc: "",
                name: "Shreedhar Kumar",
                phone: "+919988102030",
                rating: 3.5,
                reviewCount: 132
            },
            createdOn: 1212,
            createdBy: "system",
            catName: "Sample",
            imageUrl: "",
            catType: 1,
            status: 1
        };
        return new Observable(observer => {
            setTimeout(() => {
              observer.next(service);
              observer.complete();
            },1000);
        });
    }

    public getServicePaymentDetails(id): Observable<Payment[]> {
        // return this.http
        //     .get(`/api/getPayment?id=${id}`)
        //     .pipe(map((res: any) => {
        //         return res.content || {};
        //     }));
        let payment: Payment[] = [{
            key: "Service Charge",
            amount: 499
        }];
        return new Observable(observer => {
            setTimeout(() => {
              observer.next(payment);
              observer.complete();
            },1000);
        });
    }
}
