import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    PoliticallyExposedPersonsCheckReportComponent,
    PoliticallyExposedPersonsCheckReportDetailComponent,
    PoliticallyExposedPersonsCheckReportUpdateComponent,
    PoliticallyExposedPersonsCheckReportDeletePopupComponent,
    PoliticallyExposedPersonsCheckReportDeleteDialogComponent,
    politicallyExposedPersonsCheckReportRoute,
    politicallyExposedPersonsCheckReportPopupRoute
} from './';

const ENTITY_STATES = [...politicallyExposedPersonsCheckReportRoute, ...politicallyExposedPersonsCheckReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PoliticallyExposedPersonsCheckReportComponent,
        PoliticallyExposedPersonsCheckReportDetailComponent,
        PoliticallyExposedPersonsCheckReportUpdateComponent,
        PoliticallyExposedPersonsCheckReportDeleteDialogComponent,
        PoliticallyExposedPersonsCheckReportDeletePopupComponent
    ],
    entryComponents: [
        PoliticallyExposedPersonsCheckReportComponent,
        PoliticallyExposedPersonsCheckReportUpdateComponent,
        PoliticallyExposedPersonsCheckReportDeleteDialogComponent,
        PoliticallyExposedPersonsCheckReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterPoliticallyExposedPersonsCheckReportModule {}
