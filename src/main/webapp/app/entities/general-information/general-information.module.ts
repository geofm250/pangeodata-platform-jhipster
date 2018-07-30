import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    GeneralInformationComponent,
    GeneralInformationDetailComponent,
    GeneralInformationUpdateComponent,
    GeneralInformationDeletePopupComponent,
    GeneralInformationDeleteDialogComponent,
    generalInformationRoute,
    generalInformationPopupRoute
} from './';

const ENTITY_STATES = [...generalInformationRoute, ...generalInformationPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GeneralInformationComponent,
        GeneralInformationDetailComponent,
        GeneralInformationUpdateComponent,
        GeneralInformationDeleteDialogComponent,
        GeneralInformationDeletePopupComponent
    ],
    entryComponents: [
        GeneralInformationComponent,
        GeneralInformationUpdateComponent,
        GeneralInformationDeleteDialogComponent,
        GeneralInformationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterGeneralInformationModule {}
