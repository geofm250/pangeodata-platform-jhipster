import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    ReportedCriminalActivityCheckComponent,
    ReportedCriminalActivityCheckDetailComponent,
    ReportedCriminalActivityCheckUpdateComponent,
    ReportedCriminalActivityCheckDeletePopupComponent,
    ReportedCriminalActivityCheckDeleteDialogComponent,
    reportedCriminalActivityCheckRoute,
    reportedCriminalActivityCheckPopupRoute
} from './';

const ENTITY_STATES = [...reportedCriminalActivityCheckRoute, ...reportedCriminalActivityCheckPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReportedCriminalActivityCheckComponent,
        ReportedCriminalActivityCheckDetailComponent,
        ReportedCriminalActivityCheckUpdateComponent,
        ReportedCriminalActivityCheckDeleteDialogComponent,
        ReportedCriminalActivityCheckDeletePopupComponent
    ],
    entryComponents: [
        ReportedCriminalActivityCheckComponent,
        ReportedCriminalActivityCheckUpdateComponent,
        ReportedCriminalActivityCheckDeleteDialogComponent,
        ReportedCriminalActivityCheckDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterReportedCriminalActivityCheckModule {}
