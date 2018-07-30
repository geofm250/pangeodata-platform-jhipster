import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    OrderEducationFormComponent,
    OrderEducationFormDetailComponent,
    OrderEducationFormUpdateComponent,
    OrderEducationFormDeletePopupComponent,
    OrderEducationFormDeleteDialogComponent,
    orderEducationFormRoute,
    orderEducationFormPopupRoute
} from './';

const ENTITY_STATES = [...orderEducationFormRoute, ...orderEducationFormPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderEducationFormComponent,
        OrderEducationFormDetailComponent,
        OrderEducationFormUpdateComponent,
        OrderEducationFormDeleteDialogComponent,
        OrderEducationFormDeletePopupComponent
    ],
    entryComponents: [
        OrderEducationFormComponent,
        OrderEducationFormUpdateComponent,
        OrderEducationFormDeleteDialogComponent,
        OrderEducationFormDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterOrderEducationFormModule {}
