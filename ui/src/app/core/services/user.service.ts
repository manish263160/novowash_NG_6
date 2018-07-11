import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

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
            },1000);
        });
    }
}
