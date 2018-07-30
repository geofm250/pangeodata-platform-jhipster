import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    CivilLitigationCheckReportComponent,
    CivilLitigationCheckReportDetailComponent,
    CivilLitigationCheckReportUpdateComponent,
    CivilLitigationCheckReportDeletePopupComponent,
    CivilLitigationCheckReportDeleteDialogComponent,
    civilLitigationCheckReportRoute,
    civilLitigationCheckReportPopupRoute
} from './';

const ENTITY_STATES = [...civilLitigationCheckReportRoute, ...civilLitigationCheckReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CivilLitigationCheckReportComponent,
        CivilLitigationCheckReportDetailComponent,
        CivilLitigationCheckReportUpdateComponent,
        CivilLitigationCheckReportDeleteDialogComponent,
        CivilLitigationCheckReportDeletePopupComponent
    ],
    entryComponents: [
        CivilLitigationCheckReportComponent,
        CivilLitigationCheckReportUpdateComponent,
        CivilLitigationCheckReportDeleteDialogComponent,
        CivilLitigationCheckReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterCivilLitigationCheckReportModule {}
