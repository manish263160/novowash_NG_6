import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Service } from "../../model/service";
import { Payment } from "../../model/payment";

@Injectable()
export class ServicesService {
    constructor(private http: HttpClient) {
    }

    public getServices(): Observable<any> {
        return this.http
            .post("http://54.245.176.18:8080/NovoWash/services/get/category", {})
            .pipe(map((res: any) => {
                return res.data || [];
            }));
    }

    public getSubServices(serviceId): Observable<any> {
        return this.http
            .post(`http://54.245.176.18:8080/NovoWash/services/get/${serviceId}`, {})
            .pipe(map((res: any) => {
                return res.data || [];
            }));
    }

    public getAllSubServices(): Observable<any> {
        return this.http
            .get(`http://13.59.141.30:8080/NovoWash/services/getAllServices`)
            .pipe(map((res: any) => {
                return res.data || [];
            }));
    }

    public getDateTimeSlots(serviceId): Observable<any> {
        return this.http
            .get(`http://13.59.141.30:8080/NovoWash/services/get/serviceDateTime/${serviceId}`)
            .pipe(map((res: any) => {
                return res.data || {};
            }));
    }

    public getPaymentUrl(payload) {
        return this.http
            .post("http://13.59.141.30:8080/NovoWash/payment/paymentRequest", payload)
            .pipe(map((res: any) => {
                return res.data || {};
            }));
    }

    public registerForHelp(payload) {
        const url = 
            `http://13.59.141.30:8080/NovoWash/permitall/insertPotentialUser?name=${payload.name}&email=&phone=${payload.number}`;
        return this.http
            .put(encodeURI(url), {})
            .pipe(map((res: any) => {
                return res.data || {};
            }));
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
