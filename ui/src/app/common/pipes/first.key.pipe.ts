import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "firstKey"})
export class FirstKeyPipe implements PipeTransform {
    public transform(obj: object): any {
        if (obj) {
            const keys = Object.keys(obj);
            if (keys && keys.length) {
                return keys[0];
            }
        }
        return null;
    }
}
