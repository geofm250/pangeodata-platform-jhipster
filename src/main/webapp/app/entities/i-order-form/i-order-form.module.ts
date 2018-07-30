import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    IOrderFormComponent,
    IOrderFormDetailComponent,
    IOrderFormUpdateComponent,
    IOrderFormDeletePopupComponent,
    IOrderFormDeleteDialogComponent,
    iOrderFormRoute,
    iOrderFormPopupRoute
} from './';

const ENTITY_STATES = [...iOrderFormRoute, ...iOrderFormPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IOrderFormComponent,
        IOrderFormDetailComponent,
        IOrderFormUpdateComponent,
        IOrderFormDeleteDialogComponent,
        IOrderFormDeletePopupComponent
    ],
    entryComponents: [IOrderFormComponent, IOrderFormUpdateComponent, IOrderFormDeleteDialogComponent, IOrderFormDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterIOrderFormModule {}
