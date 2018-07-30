import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    EducationReportComponent,
    EducationReportDetailComponent,
    EducationReportUpdateComponent,
    EducationReportDeletePopupComponent,
    EducationReportDeleteDialogComponent,
    educationReportRoute,
    educationReportPopupRoute
} from './';

const ENTITY_STATES = [...educationReportRoute, ...educationReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EducationReportComponent,
        EducationReportDetailComponent,
        EducationReportUpdateComponent,
        EducationReportDeleteDialogComponent,
        EducationReportDeletePopupComponent
    ],
    entryComponents: [
        EducationReportComponent,
        EducationReportUpdateComponent,
        EducationReportDeleteDialogComponent,
        EducationReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterEducationReportModule {}
