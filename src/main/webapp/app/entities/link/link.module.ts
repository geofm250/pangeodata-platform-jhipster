import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    LinkComponent,
    LinkDetailComponent,
    LinkUpdateComponent,
    LinkDeletePopupComponent,
    LinkDeleteDialogComponent,
    linkRoute,
    linkPopupRoute
} from './';

const ENTITY_STATES = [...linkRoute, ...linkPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [LinkComponent, LinkDetailComponent, LinkUpdateComponent, LinkDeleteDialogComponent, LinkDeletePopupComponent],
    entryComponents: [LinkComponent, LinkUpdateComponent, LinkDeleteDialogComponent, LinkDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterLinkModule {}
