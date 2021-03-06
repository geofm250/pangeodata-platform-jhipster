import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    SessionComponent,
    SessionDetailComponent,
    SessionUpdateComponent,
    SessionDeletePopupComponent,
    SessionDeleteDialogComponent,
    sessionRoute,
    sessionPopupRoute
} from './';

const ENTITY_STATES = [...sessionRoute, ...sessionPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SessionComponent,
        SessionDetailComponent,
        SessionUpdateComponent,
        SessionDeleteDialogComponent,
        SessionDeletePopupComponent
    ],
    entryComponents: [SessionComponent, SessionUpdateComponent, SessionDeleteDialogComponent, SessionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterSessionModule {}
