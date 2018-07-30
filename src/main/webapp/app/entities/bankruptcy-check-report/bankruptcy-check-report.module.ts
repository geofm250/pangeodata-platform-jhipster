import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    BankruptcyCheckReportComponent,
    BankruptcyCheckReportDetailComponent,
    BankruptcyCheckReportUpdateComponent,
    BankruptcyCheckReportDeletePopupComponent,
    BankruptcyCheckReportDeleteDialogComponent,
    bankruptcyCheckReportRoute,
    bankruptcyCheckReportPopupRoute
} from './';

const ENTITY_STATES = [...bankruptcyCheckReportRoute, ...bankruptcyCheckReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BankruptcyCheckReportComponent,
        BankruptcyCheckReportDetailComponent,
        BankruptcyCheckReportUpdateComponent,
        BankruptcyCheckReportDeleteDialogComponent,
        BankruptcyCheckReportDeletePopupComponent
    ],
    entryComponents: [
        BankruptcyCheckReportComponent,
        BankruptcyCheckReportUpdateComponent,
        BankruptcyCheckReportDeleteDialogComponent,
        BankruptcyCheckReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterBankruptcyCheckReportModule {}
