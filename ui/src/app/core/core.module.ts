import { NgModule } from "@angular/core";

import { UserService } from "./services/user.service";
import { ServicesService } from "./services/services.service";

@NgModule({
    declarations: [],
    entryComponents: [],
    imports: [],
    providers: [
        UserService,
        ServicesService,
    ],
})
export class CoreModule {}