import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import { CommonService } from "../common/services/common.service";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

    private requestCount: number = 0;
    private requestUrls: string[] = [];
    private nonLoaderUrls: string[] = [];
    private token: string;
    private refreshToken: string;

    constructor(
        private commonService: CommonService,
        private injector: Injector,
        private router: Router,
    ) {
        this.nonLoaderUrls = [
            `/common/api/auth/token`,
            `/permitall/search/getSearch/`,

        ];
    }

    /**
     * checkStringMatchInArray
strName: string     */
    public checkStringMatchInArray(strName: string): boolean {
        let bool = false;
     this.nonLoaderUrls.forEach(element => {
          if(strName.indexOf(element) > -1){
            bool = true;
          }
     });
     return bool;
    }
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      ((request) => {
        // console.log("==========",this.checkStringMatchInArray(request.url));
            setTimeout(() => {
                if (
                    // this.nonLoaderUrls.indexOf(request.url) === -1
                    !this.checkStringMatchInArray(request.url)
                ) {
                    if (this.requestUrls.indexOf(request.url) === -1) {
                        this.requestCount++;
                        this.requestUrls.push(request.url);
                        this.commonService.showLoader = true;
                    }
                }
            }, 50);
        })(req);
        if (req.url === "/api/auth/token") {
            const refreshToken = localStorage.getItem("refreshToken");
            req = req.clone({
                setHeaders: {
                    "Content-Type": "application/json",
                    "X-Authorization": `Bearer ${refreshToken}`,
                    "view-port": "Web",
                },
            });

            return next.handle(req);

        } else if (req.url.indexOf("/NovoWash/") > 0 ) {
            // const xToken = "Bearer " + this.token;
            // req = req.clone({
            //     setHeaders: {
            //         "Content-Type": "application/json",
            //         "X-Authorization": xToken,
            //         "view-port": "Web",
            //     },
            // });
        }

        return next.handle(req).do((event) => {
            if (event instanceof HttpResponse) {
                ((request) => {
                    setTimeout(() => {
                        if (this.requestUrls.indexOf(request.url) !== -1) {
                            this.requestCount--;
                            this.requestUrls.splice(this.requestUrls.indexOf(request.url), 1);
                        }
                        if (this.requestCount === 0) {
                            this.commonService.showLoader = false;
                        }
                    }, 200);
                })(req);
            }
        }).catch((err) => {
            this.commonService.showLoader = false;
            if (err instanceof HttpErrorResponse) {
                console.log("SOMETHING WENT WRONG:::", err);
            }
            return Observable.throw(err);
        });
    }
}
