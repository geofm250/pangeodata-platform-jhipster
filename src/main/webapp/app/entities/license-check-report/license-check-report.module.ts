import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    LicenseCheckReportComponent,
    LicenseCheckReportDetailComponent,
    LicenseCheckReportUpdateComponent,
    LicenseCheckReportDeletePopupComponent,
    LicenseCheckReportDeleteDialogComponent,
    licenseCheckReportRoute,
    licenseCheckReportPopupRoute
} from './';

const ENTITY_STATES = [...licenseCheckReportRoute, ...licenseCheckReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LicenseCheckReportComponent,
        LicenseCheckReportDetailComponent,
        LicenseCheckReportUpdateComponent,
        LicenseCheckReportDeleteDialogComponent,
        LicenseCheckReportDeletePopupComponent
    ],
    entryComponents: [
        LicenseCheckReportComponent,
        LicenseCheckReportUpdateComponent,
        LicenseCheckReportDeleteDialogComponent,
        LicenseCheckReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterLicenseCheckReportModule {}
