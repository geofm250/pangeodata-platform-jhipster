import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    OrderFormComponent,
    OrderFormDetailComponent,
    OrderFormUpdateComponent,
    OrderFormDeletePopupComponent,
    OrderFormDeleteDialogComponent,
    orderFormRoute,
    orderFormPopupRoute
} from './';

const ENTITY_STATES = [...orderFormRoute, ...orderFormPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderFormComponent,
        OrderFormDetailComponent,
        OrderFormUpdateComponent,
        OrderFormDeleteDialogComponent,
        OrderFormDeletePopupComponent
    ],
    entryComponents: [OrderFormComponent, OrderFormUpdateComponent, OrderFormDeleteDialogComponent, OrderFormDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterOrderFormModule {}
