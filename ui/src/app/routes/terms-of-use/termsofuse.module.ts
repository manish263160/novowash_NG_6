import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "../../shared.module";
import { TermsOfUseComponent } from "./termsofuse.component";
import { TermsOfUseRoutes } from "./termsofuse.routes";

import {
    MatCardModule,
    MatButtonModule,
} from "@angular/material";

@NgModule({
    declarations: [
        TermsOfUseComponent,
    ],
    entryComponents: [],
    imports: [
        CommonModule,
        TermsOfUseRoutes,
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        SharedModule,
    ],
    providers: [
    ],
})

export class TermsOfUseModule {}