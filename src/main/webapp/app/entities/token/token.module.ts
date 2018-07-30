import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    TokenComponent,
    TokenDetailComponent,
    TokenUpdateComponent,
    TokenDeletePopupComponent,
    TokenDeleteDialogComponent,
    tokenRoute,
    tokenPopupRoute
} from './';

const ENTITY_STATES = [...tokenRoute, ...tokenPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TokenComponent, TokenDetailComponent, TokenUpdateComponent, TokenDeleteDialogComponent, TokenDeletePopupComponent],
    entryComponents: [TokenComponent, TokenUpdateComponent, TokenDeleteDialogComponent, TokenDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterTokenModule {}
