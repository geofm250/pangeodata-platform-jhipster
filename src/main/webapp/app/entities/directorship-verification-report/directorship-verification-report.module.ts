import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    DirectorshipVerificationReportComponent,
    DirectorshipVerificationReportDetailComponent,
    DirectorshipVerificationReportUpdateComponent,
    DirectorshipVerificationReportDeletePopupComponent,
    DirectorshipVerificationReportDeleteDialogComponent,
    directorshipVerificationReportRoute,
    directorshipVerificationReportPopupRoute
} from './';

const ENTITY_STATES = [...directorshipVerificationReportRoute, ...directorshipVerificationReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DirectorshipVerificationReportComponent,
        DirectorshipVerificationReportDetailComponent,
        DirectorshipVerificationReportUpdateComponent,
        DirectorshipVerificationReportDeleteDialogComponent,
        DirectorshipVerificationReportDeletePopupComponent
    ],
    entryComponents: [
        DirectorshipVerificationReportComponent,
        DirectorshipVerificationReportUpdateComponent,
        DirectorshipVerificationReportDeleteDialogComponent,
        DirectorshipVerificationReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterDirectorshipVerificationReportModule {}
