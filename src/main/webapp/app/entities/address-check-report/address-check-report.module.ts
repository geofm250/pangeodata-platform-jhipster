import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    AddressCheckReportComponent,
    AddressCheckReportDetailComponent,
    AddressCheckReportUpdateComponent,
    AddressCheckReportDeletePopupComponent,
    AddressCheckReportDeleteDialogComponent,
    addressCheckReportRoute,
    addressCheckReportPopupRoute
} from './';

const ENTITY_STATES = [...addressCheckReportRoute, ...addressCheckReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AddressCheckReportComponent,
        AddressCheckReportDetailComponent,
        AddressCheckReportUpdateComponent,
        AddressCheckReportDeleteDialogComponent,
        AddressCheckReportDeletePopupComponent
    ],
    entryComponents: [
        AddressCheckReportComponent,
        AddressCheckReportUpdateComponent,
        AddressCheckReportDeleteDialogComponent,
        AddressCheckReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterAddressCheckReportModule {}
