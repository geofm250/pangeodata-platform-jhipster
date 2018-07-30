import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    OrderProfessionalLicenseFormComponent,
    OrderProfessionalLicenseFormDetailComponent,
    OrderProfessionalLicenseFormUpdateComponent,
    OrderProfessionalLicenseFormDeletePopupComponent,
    OrderProfessionalLicenseFormDeleteDialogComponent,
    orderProfessionalLicenseFormRoute,
    orderProfessionalLicenseFormPopupRoute
} from './';

const ENTITY_STATES = [...orderProfessionalLicenseFormRoute, ...orderProfessionalLicenseFormPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderProfessionalLicenseFormComponent,
        OrderProfessionalLicenseFormDetailComponent,
        OrderProfessionalLicenseFormUpdateComponent,
        OrderProfessionalLicenseFormDeleteDialogComponent,
        OrderProfessionalLicenseFormDeletePopupComponent
    ],
    entryComponents: [
        OrderProfessionalLicenseFormComponent,
        OrderProfessionalLicenseFormUpdateComponent,
        OrderProfessionalLicenseFormDeleteDialogComponent,
        OrderProfessionalLicenseFormDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterOrderProfessionalLicenseFormModule {}
