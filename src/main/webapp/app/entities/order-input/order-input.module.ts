import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    OrderInputComponent,
    OrderInputDetailComponent,
    OrderInputUpdateComponent,
    OrderInputDeletePopupComponent,
    OrderInputDeleteDialogComponent,
    orderInputRoute,
    orderInputPopupRoute
} from './';

const ENTITY_STATES = [...orderInputRoute, ...orderInputPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderInputComponent,
        OrderInputDetailComponent,
        OrderInputUpdateComponent,
        OrderInputDeleteDialogComponent,
        OrderInputDeletePopupComponent
    ],
    entryComponents: [OrderInputComponent, OrderInputUpdateComponent, OrderInputDeleteDialogComponent, OrderInputDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterOrderInputModule {}
