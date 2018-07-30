import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    ApplicationServiceComponent,
    ApplicationServiceDetailComponent,
    ApplicationServiceUpdateComponent,
    ApplicationServiceDeletePopupComponent,
    ApplicationServiceDeleteDialogComponent,
    applicationServiceRoute,
    applicationServicePopupRoute
} from './';

const ENTITY_STATES = [...applicationServiceRoute, ...applicationServicePopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ApplicationServiceComponent,
        ApplicationServiceDetailComponent,
        ApplicationServiceUpdateComponent,
        ApplicationServiceDeleteDialogComponent,
        ApplicationServiceDeletePopupComponent
    ],
    entryComponents: [
        ApplicationServiceComponent,
        ApplicationServiceUpdateComponent,
        ApplicationServiceDeleteDialogComponent,
        ApplicationServiceDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterApplicationServiceModule {}
