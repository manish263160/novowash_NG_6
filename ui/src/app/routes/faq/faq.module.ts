import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "../../shared.module";
import { FAQComponent } from "./faq.component";
import { FAQRoutes } from "./faq.routes";

import {
    MatCardModule,
    MatButtonModule,
} from "@angular/material";

@NgModule({
    declarations: [
        FAQComponent,
    ],
    entryComponents: [],
    imports: [
        CommonModule,
        FAQRoutes,
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        SharedModule,
    ],
    providers: [
    ],
})

export class FAQModule {}