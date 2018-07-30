import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    PassportCheckReportComponent,
    PassportCheckReportDetailComponent,
    PassportCheckReportUpdateComponent,
    PassportCheckReportDeletePopupComponent,
    PassportCheckReportDeleteDialogComponent,
    passportCheckReportRoute,
    passportCheckReportPopupRoute
} from './';

const ENTITY_STATES = [...passportCheckReportRoute, ...passportCheckReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PassportCheckReportComponent,
        PassportCheckReportDetailComponent,
        PassportCheckReportUpdateComponent,
        PassportCheckReportDeleteDialogComponent,
        PassportCheckReportDeletePopupComponent
    ],
    entryComponents: [
        PassportCheckReportComponent,
        PassportCheckReportUpdateComponent,
        PassportCheckReportDeleteDialogComponent,
        PassportCheckReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterPassportCheckReportModule {}
