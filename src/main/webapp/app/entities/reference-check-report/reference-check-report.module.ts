import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    ReferenceCheckReportComponent,
    ReferenceCheckReportDetailComponent,
    ReferenceCheckReportUpdateComponent,
    ReferenceCheckReportDeletePopupComponent,
    ReferenceCheckReportDeleteDialogComponent,
    referenceCheckReportRoute,
    referenceCheckReportPopupRoute
} from './';

const ENTITY_STATES = [...referenceCheckReportRoute, ...referenceCheckReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReferenceCheckReportComponent,
        ReferenceCheckReportDetailComponent,
        ReferenceCheckReportUpdateComponent,
        ReferenceCheckReportDeleteDialogComponent,
        ReferenceCheckReportDeletePopupComponent
    ],
    entryComponents: [
        ReferenceCheckReportComponent,
        ReferenceCheckReportUpdateComponent,
        ReferenceCheckReportDeleteDialogComponent,
        ReferenceCheckReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterReferenceCheckReportModule {}
