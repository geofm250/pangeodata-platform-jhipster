import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    LocalLanguageMediaCheckReportComponent,
    LocalLanguageMediaCheckReportDetailComponent,
    LocalLanguageMediaCheckReportUpdateComponent,
    LocalLanguageMediaCheckReportDeletePopupComponent,
    LocalLanguageMediaCheckReportDeleteDialogComponent,
    localLanguageMediaCheckReportRoute,
    localLanguageMediaCheckReportPopupRoute
} from './';

const ENTITY_STATES = [...localLanguageMediaCheckReportRoute, ...localLanguageMediaCheckReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LocalLanguageMediaCheckReportComponent,
        LocalLanguageMediaCheckReportDetailComponent,
        LocalLanguageMediaCheckReportUpdateComponent,
        LocalLanguageMediaCheckReportDeleteDialogComponent,
        LocalLanguageMediaCheckReportDeletePopupComponent
    ],
    entryComponents: [
        LocalLanguageMediaCheckReportComponent,
        LocalLanguageMediaCheckReportUpdateComponent,
        LocalLanguageMediaCheckReportDeleteDialogComponent,
        LocalLanguageMediaCheckReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterLocalLanguageMediaCheckReportModule {}
