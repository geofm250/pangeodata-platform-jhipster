import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    DriversLicenseCheckReportComponent,
    DriversLicenseCheckReportDetailComponent,
    DriversLicenseCheckReportUpdateComponent,
    DriversLicenseCheckReportDeletePopupComponent,
    DriversLicenseCheckReportDeleteDialogComponent,
    driversLicenseCheckReportRoute,
    driversLicenseCheckReportPopupRoute
} from './';

const ENTITY_STATES = [...driversLicenseCheckReportRoute, ...driversLicenseCheckReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DriversLicenseCheckReportComponent,
        DriversLicenseCheckReportDetailComponent,
        DriversLicenseCheckReportUpdateComponent,
        DriversLicenseCheckReportDeleteDialogComponent,
        DriversLicenseCheckReportDeletePopupComponent
    ],
    entryComponents: [
        DriversLicenseCheckReportComponent,
        DriversLicenseCheckReportUpdateComponent,
        DriversLicenseCheckReportDeleteDialogComponent,
        DriversLicenseCheckReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterDriversLicenseCheckReportModule {}
