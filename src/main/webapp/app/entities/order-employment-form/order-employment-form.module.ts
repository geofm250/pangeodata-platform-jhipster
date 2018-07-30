import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    OrderEmploymentFormComponent,
    OrderEmploymentFormDetailComponent,
    OrderEmploymentFormUpdateComponent,
    OrderEmploymentFormDeletePopupComponent,
    OrderEmploymentFormDeleteDialogComponent,
    orderEmploymentFormRoute,
    orderEmploymentFormPopupRoute
} from './';

const ENTITY_STATES = [...orderEmploymentFormRoute, ...orderEmploymentFormPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderEmploymentFormComponent,
        OrderEmploymentFormDetailComponent,
        OrderEmploymentFormUpdateComponent,
        OrderEmploymentFormDeleteDialogComponent,
        OrderEmploymentFormDeletePopupComponent
    ],
    entryComponents: [
        OrderEmploymentFormComponent,
        OrderEmploymentFormUpdateComponent,
        OrderEmploymentFormDeleteDialogComponent,
        OrderEmploymentFormDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterOrderEmploymentFormModule {}
