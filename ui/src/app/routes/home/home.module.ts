import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FlexLayoutModule } from "@angular/flex-layout";
import { SlickModule } from 'ngx-slick';
import { DialogService } from "../../common/services/dialog.service";
import { HomeComponent } from "./home.component";
import { HomeRoutes } from "./home.routes";

@NgModule({
    declarations: [
        HomeComponent,
    ],
    entryComponents: [],
    imports: [
        CommonModule,
        HomeRoutes,
        FlexLayoutModule,
        SlickModule,
    ],
    providers: [
        // DialogService,
    ],
})

export class HomeModule {}