import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    RequirementComponent,
    RequirementDetailComponent,
    RequirementUpdateComponent,
    RequirementDeletePopupComponent,
    RequirementDeleteDialogComponent,
    requirementRoute,
    requirementPopupRoute
} from './';

const ENTITY_STATES = [...requirementRoute, ...requirementPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RequirementComponent,
        RequirementDetailComponent,
        RequirementUpdateComponent,
        RequirementDeleteDialogComponent,
        RequirementDeletePopupComponent
    ],
    entryComponents: [RequirementComponent, RequirementUpdateComponent, RequirementDeleteDialogComponent, RequirementDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterRequirementModule {}
