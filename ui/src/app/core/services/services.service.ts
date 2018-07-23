import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Service } from "../../model/service";
import { Payment } from "../../model/payment";

@Injectable()
export class ServicesService {
    constructor(private http: HttpClient) {
    }

    public getServices(): Observable<any> {
        // return this.http
        //     .get("/api/checkNumber")
        //     .pipe(map((res: any) => {
        //         return res.content || [];
        //     }));
        let serviceItems = [{
                icon: "url('/assets/img/home-cleaning.png')",
                name: "Home Cleaning"
            }, {
                icon: "url('/assets/img/furniture.png')",
                name: "Home Upholstery/Furniture"
            }, {
                icon: "url('/assets/img/home-package.png')",
                name: "New home package"
            }, {
                icon: "url('/assets/img/sanitization.png')",
                name: "Home Sanitization"
            }, {
                icon: "url('/assets/img/car-detailing.png')",
                name: "Car Detailing"
            }, {
                icon: "url('/assets/img/laundry.png')",
                name: "Laundry Services"
            }, {
                icon: "url('/assets/img/pest-control.png')",
                name: "Pest Control"
            }, {
                icon: "url('/assets/img/comm-cleaning.png')",
                name: "Commercial cleaning"
        }];
        return new Observable(observer => {
            setTimeout(() => {
              observer.next(serviceItems);
              observer.complete();
            },1000);
        });
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
            }
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
