import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    IdentityCheckReportComponent,
    IdentityCheckReportDetailComponent,
    IdentityCheckReportUpdateComponent,
    IdentityCheckReportDeletePopupComponent,
    IdentityCheckReportDeleteDialogComponent,
    identityCheckReportRoute,
    identityCheckReportPopupRoute
} from './';

const ENTITY_STATES = [...identityCheckReportRoute, ...identityCheckReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IdentityCheckReportComponent,
        IdentityCheckReportDetailComponent,
        IdentityCheckReportUpdateComponent,
        IdentityCheckReportDeleteDialogComponent,
        IdentityCheckReportDeletePopupComponent
    ],
    entryComponents: [
        IdentityCheckReportComponent,
        IdentityCheckReportUpdateComponent,
        IdentityCheckReportDeleteDialogComponent,
        IdentityCheckReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterIdentityCheckReportModule {}
