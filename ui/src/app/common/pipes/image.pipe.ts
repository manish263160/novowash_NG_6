import { HttpClient, HttpResponse } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { map, switchMap } from 'rxjs/operators';
import { Observable } from "rxjs";

@Pipe({name: "image"})
export class ImagePipe implements PipeTransform {
    constructor(private http: HttpClient, private domSanitizer: DomSanitizer) {}

    public transform(url: string) {
        if (!url) {
            return ;
        }
        /* tell that XHR is going to receive an image as response, so it can be then converted to blob, and also provide your token in a way that your server expects */
        // const headers = new Headers({"X-Authorization": `Bearer ${token}`, "Content-Type": "image/*"});
        return this.http
            .get(url, { responseType: "arraybuffer", observe: "response" }) // specify that response should be treated as blob data
            .pipe(map((response) => response.body)) // take the blob
            .pipe(switchMap((blob) => {
                // return new observable which emits a base64 string when blob is converted to base64
                    return Observable.create((observer) => {
                        const reader = new FileReader();
                        const img = new Blob([blob], { type: "image/*" });
                        // convert blob to base64
                        reader.readAsDataURL(img);
                        reader.onloadend = () => {
                            observer.next(this.domSanitizer.bypassSecurityTrustResourceUrl(reader.result)); // emit the base64 string result
                        };
                    });
                })
            );
    }
}
