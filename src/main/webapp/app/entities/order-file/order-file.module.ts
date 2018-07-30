import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    OrderFileComponent,
    OrderFileDetailComponent,
    OrderFileUpdateComponent,
    OrderFileDeletePopupComponent,
    OrderFileDeleteDialogComponent,
    orderFileRoute,
    orderFilePopupRoute
} from './';

const ENTITY_STATES = [...orderFileRoute, ...orderFilePopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderFileComponent,
        OrderFileDetailComponent,
        OrderFileUpdateComponent,
        OrderFileDeleteDialogComponent,
        OrderFileDeletePopupComponent
    ],
    entryComponents: [OrderFileComponent, OrderFileUpdateComponent, OrderFileDeleteDialogComponent, OrderFileDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterOrderFileModule {}
