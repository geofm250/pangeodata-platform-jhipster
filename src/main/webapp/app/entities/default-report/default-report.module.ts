import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    DefaultReportComponent,
    DefaultReportDetailComponent,
    DefaultReportUpdateComponent,
    DefaultReportDeletePopupComponent,
    DefaultReportDeleteDialogComponent,
    defaultReportRoute,
    defaultReportPopupRoute
} from './';

const ENTITY_STATES = [...defaultReportRoute, ...defaultReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DefaultReportComponent,
        DefaultReportDetailComponent,
        DefaultReportUpdateComponent,
        DefaultReportDeleteDialogComponent,
        DefaultReportDeletePopupComponent
    ],
    entryComponents: [
        DefaultReportComponent,
        DefaultReportUpdateComponent,
        DefaultReportDeleteDialogComponent,
        DefaultReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterDefaultReportModule {}
