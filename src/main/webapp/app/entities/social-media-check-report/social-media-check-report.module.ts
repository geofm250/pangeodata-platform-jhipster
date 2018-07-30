import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    SocialMediaCheckReportComponent,
    SocialMediaCheckReportDetailComponent,
    SocialMediaCheckReportUpdateComponent,
    SocialMediaCheckReportDeletePopupComponent,
    SocialMediaCheckReportDeleteDialogComponent,
    socialMediaCheckReportRoute,
    socialMediaCheckReportPopupRoute
} from './';

const ENTITY_STATES = [...socialMediaCheckReportRoute, ...socialMediaCheckReportPopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SocialMediaCheckReportComponent,
        SocialMediaCheckReportDetailComponent,
        SocialMediaCheckReportUpdateComponent,
        SocialMediaCheckReportDeleteDialogComponent,
        SocialMediaCheckReportDeletePopupComponent
    ],
    entryComponents: [
        SocialMediaCheckReportComponent,
        SocialMediaCheckReportUpdateComponent,
        SocialMediaCheckReportDeleteDialogComponent,
        SocialMediaCheckReportDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterSocialMediaCheckReportModule {}
