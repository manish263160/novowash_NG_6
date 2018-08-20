import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "../../shared.module";
import { AboutUsComponent } from "./about-us.component";
import { AboutUsRoutes } from "./about-us.routes";

import {
    MatCardModule,
    MatButtonModule,
} from "@angular/material";

@NgModule({
    declarations: [
        AboutUsComponent,
    ],
    entryComponents: [],
    imports: [
        CommonModule,
        AboutUsRoutes,
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        SharedModule,
    ],
    providers: [
    ],
})

export class AboutUsModule {}