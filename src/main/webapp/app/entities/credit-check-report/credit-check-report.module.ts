import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    CreditCheckReportComponent,
    CreditCheckReportDetailComponent,
    CreditCheckReportUpdateComponent,
    CreditCheckReportDeletePopupComponent,
    CreditCheckReportDeleteDialogComponent,
    creditCheckReportRoute,
    creditCheckReportPopupRoute
} from './';

const ENTITY_STATES = [...creditCheckReportRoute, ...creditCheckReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CreditCheckReportComponent,
        CreditCheckReportDetailComponent,
        CreditCheckReportUpdateComponent,
        CreditCheckReportDeleteDialogComponent,
        CreditCheckReportDeletePopupComponent
    ],
    entryComponents: [
        CreditCheckReportComponent,
        CreditCheckReportUpdateComponent,
        CreditCheckReportDeleteDialogComponent,
        CreditCheckReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterCreditCheckReportModule {}
