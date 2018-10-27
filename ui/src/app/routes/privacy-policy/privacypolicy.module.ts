import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "../../shared.module";
import { PrivacyPolicyComponent } from "./privacypolicy.component";
import { PrivacyPolicyRoutes } from "./privacypolicy.routes";

import {
    MatCardModule,
    MatButtonModule,
} from "@angular/material";

@NgModule({
    declarations: [
        PrivacyPolicyComponent,
    ],
    entryComponents: [],
    imports: [
        CommonModule,
        PrivacyPolicyRoutes,
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        SharedModule,
    ],
    providers: [
    ],
})

export class PrivacyPolicyModule {}