import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FlexLayoutModule } from "@angular/flex-layout";
import { SlickModule } from 'ngx-slick';
import { DialogService } from "../../common/services/dialog.service";
import { HomeComponent } from "./home.component";
import { HomeRoutes } from "./home.routes";

import { 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
} from "@angular/material";

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
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ],
    providers: [
        // DialogService,
    ],
})

export class HomeModule {}