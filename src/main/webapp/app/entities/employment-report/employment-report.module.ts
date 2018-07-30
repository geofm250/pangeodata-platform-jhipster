import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    EmploymentReportComponent,
    EmploymentReportDetailComponent,
    EmploymentReportUpdateComponent,
    EmploymentReportDeletePopupComponent,
    EmploymentReportDeleteDialogComponent,
    employmentReportRoute,
    employmentReportPopupRoute
} from './';

const ENTITY_STATES = [...employmentReportRoute, ...employmentReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmploymentReportComponent,
        EmploymentReportDetailComponent,
        EmploymentReportUpdateComponent,
        EmploymentReportDeleteDialogComponent,
        EmploymentReportDeletePopupComponent
    ],
    entryComponents: [
        EmploymentReportComponent,
        EmploymentReportUpdateComponent,
        EmploymentReportDeleteDialogComponent,
        EmploymentReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterEmploymentReportModule {}
