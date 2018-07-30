import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PangeodataJHipsterSharedModule } from 'app/shared';
import {
    RuleComponent,
    RuleDetailComponent,
    RuleUpdateComponent,
    RuleDeletePopupComponent,
    RuleDeleteDialogComponent,
    ruleRoute,
    rulePopupRoute
} from './';

const ENTITY_STATES = [...ruleRoute, ...rulePopupRoute];

@NgModule({
    imports: [PangeodataJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [RuleComponent, RuleDetailComponent, RuleUpdateComponent, RuleDeleteDialogComponent, RuleDeletePopupComponent],
    entryComponents: [RuleComponent, RuleUpdateComponent, RuleDeleteDialogComponent, RuleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterRuleModule {}
