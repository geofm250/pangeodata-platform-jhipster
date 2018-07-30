import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    IOrderReportComponent,
    IOrderReportDetailComponent,
    IOrderReportUpdateComponent,
    IOrderReportDeletePopupComponent,
    IOrderReportDeleteDialogComponent,
    iOrderReportRoute,
    iOrderReportPopupRoute
} from './';

const ENTITY_STATES = [...iOrderReportRoute, ...iOrderReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IOrderReportComponent,
        IOrderReportDetailComponent,
        IOrderReportUpdateComponent,
        IOrderReportDeleteDialogComponent,
        IOrderReportDeletePopupComponent
    ],
    entryComponents: [
        IOrderReportComponent,
        IOrderReportUpdateComponent,
        IOrderReportDeleteDialogComponent,
        IOrderReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterIOrderReportModule {}
