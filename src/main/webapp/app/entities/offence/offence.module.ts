import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    OffenceComponent,
    OffenceDetailComponent,
    OffenceUpdateComponent,
    OffenceDeletePopupComponent,
    OffenceDeleteDialogComponent,
    offenceRoute,
    offencePopupRoute
} from './';

const ENTITY_STATES = [...offenceRoute, ...offencePopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OffenceComponent,
        OffenceDetailComponent,
        OffenceUpdateComponent,
        OffenceDeleteDialogComponent,
        OffenceDeletePopupComponent
    ],
    entryComponents: [OffenceComponent, OffenceUpdateComponent, OffenceDeleteDialogComponent, OffenceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterOffenceModule {}
