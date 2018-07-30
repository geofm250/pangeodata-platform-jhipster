import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    ICoverNameComponent,
    ICoverNameDetailComponent,
    ICoverNameUpdateComponent,
    ICoverNameDeletePopupComponent,
    ICoverNameDeleteDialogComponent,
    iCoverNameRoute,
    iCoverNamePopupRoute
} from './';

const ENTITY_STATES = [...iCoverNameRoute, ...iCoverNamePopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ICoverNameComponent,
        ICoverNameDetailComponent,
        ICoverNameUpdateComponent,
        ICoverNameDeleteDialogComponent,
        ICoverNameDeletePopupComponent
    ],
    entryComponents: [ICoverNameComponent, ICoverNameUpdateComponent, ICoverNameDeleteDialogComponent, ICoverNameDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterICoverNameModule {}
