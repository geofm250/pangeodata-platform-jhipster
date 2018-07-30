import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    ProductCountryComponent,
    ProductCountryDetailComponent,
    ProductCountryUpdateComponent,
    ProductCountryDeletePopupComponent,
    ProductCountryDeleteDialogComponent,
    productCountryRoute,
    productCountryPopupRoute
} from './';

const ENTITY_STATES = [...productCountryRoute, ...productCountryPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductCountryComponent,
        ProductCountryDetailComponent,
        ProductCountryUpdateComponent,
        ProductCountryDeleteDialogComponent,
        ProductCountryDeletePopupComponent
    ],
    entryComponents: [
        ProductCountryComponent,
        ProductCountryUpdateComponent,
        ProductCountryDeleteDialogComponent,
        ProductCountryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterProductCountryModule {}
