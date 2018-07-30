import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    CriminalRecordReportComponent,
    CriminalRecordReportDetailComponent,
    CriminalRecordReportUpdateComponent,
    CriminalRecordReportDeletePopupComponent,
    CriminalRecordReportDeleteDialogComponent,
    criminalRecordReportRoute,
    criminalRecordReportPopupRoute
} from './';

const ENTITY_STATES = [...criminalRecordReportRoute, ...criminalRecordReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CriminalRecordReportComponent,
        CriminalRecordReportDetailComponent,
        CriminalRecordReportUpdateComponent,
        CriminalRecordReportDeleteDialogComponent,
        CriminalRecordReportDeletePopupComponent
    ],
    entryComponents: [
        CriminalRecordReportComponent,
        CriminalRecordReportUpdateComponent,
        CriminalRecordReportDeleteDialogComponent,
        CriminalRecordReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterCriminalRecordReportModule {}
