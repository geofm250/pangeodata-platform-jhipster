import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    FileComponent,
    FileDetailComponent,
    FileUpdateComponent,
    FileDeletePopupComponent,
    FileDeleteDialogComponent,
    fileRoute,
    filePopupRoute
} from './';

const ENTITY_STATES = [...fileRoute, ...filePopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [FileComponent, FileDetailComponent, FileUpdateComponent, FileDeleteDialogComponent, FileDeletePopupComponent],
    entryComponents: [FileComponent, FileUpdateComponent, FileDeleteDialogComponent, FileDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterFileModule {}
