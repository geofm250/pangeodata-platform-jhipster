import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PangeodataJHipsterTransactionModule } from './transaction/transaction.module';
import { PangeodataJHipsterGeneralInformationModule } from './general-information/general-information.module';
import { PangeodataJHipsterAddressModule } from './address/address.module';
import { PangeodataJHipsterCountryModule } from './country/country.module';
import { PangeodataJHipsterOrderModule } from './order/order.module';
import { PangeodataJHipsterCustomUserModule } from './custom-user/custom-user.module';
import { PangeodataJHipsterCompanyModule } from './company/company.module';
import { PangeodataJHipsterOrderFileModule } from './order-file/order-file.module';
import { PangeodataJHipsterOrderInputModule } from './order-input/order-input.module';
import { PangeodataJHipsterOrderFormModule } from './order-form/order-form.module';
import { PangeodataJHipsterProductModule } from './product/product.module';
import { PangeodataJHipsterIOrderReportModule } from './i-order-report/i-order-report.module';
import { PangeodataJHipsterApplicationServiceModule } from './application-service/application-service.module';
import { PangeodataJHipsterFileModule } from './file/file.module';
import { PangeodataJHipsterLinkModule } from './link/link.module';
import { PangeodataJHipsterICoverNameModule } from './i-cover-name/i-cover-name.module';
import { PangeodataJHipsterIOrderFormModule } from './i-order-form/i-order-form.module';
import { PangeodataJHipsterOrderEmploymentFormModule } from './order-employment-form/order-employment-form.module';
import { PangeodataJHipsterOrderEducationFormModule } from './order-education-form/order-education-form.module';
import { PangeodataJHipsterOrderProfessionalLicenseFormModule } from './order-professional-license-form/order-professional-license-form.module';
import { PangeodataJHipsterProductCountryModule } from './product-country/product-country.module';
import { PangeodataJHipsterCriminalRecordReportModule } from './criminal-record-report/criminal-record-report.module';
import { PangeodataJHipsterEducationReportModule } from './education-report/education-report.module';
import { PangeodataJHipsterEmploymentReportModule } from './employment-report/employment-report.module';
import { PangeodataJHipsterAddressCheckReportModule } from './address-check-report/address-check-report.module';
import { PangeodataJHipsterBankruptcyCheckReportModule } from './bankruptcy-check-report/bankruptcy-check-report.module';
import { PangeodataJHipsterCivilLitigationCheckReportModule } from './civil-litigation-check-report/civil-litigation-check-report.module';
import { PangeodataJHipsterCreditCheckReportModule } from './credit-check-report/credit-check-report.module';
import { PangeodataJHipsterDirectorshipVerificationReportModule } from './directorship-verification-report/directorship-verification-report.module';
import { PangeodataJHipsterDriversLicenseCheckReportModule } from './drivers-license-check-report/drivers-license-check-report.module';
import { PangeodataJHipsterIdentityCheckReportModule } from './identity-check-report/identity-check-report.module';
import { PangeodataJHipsterLicenseCheckReportModule } from './license-check-report/license-check-report.module';
import { PangeodataJHipsterLocalLanguageMediaCheckReportModule } from './local-language-media-check-report/local-language-media-check-report.module';
import { PangeodataJHipsterPassportCheckReportModule } from './passport-check-report/passport-check-report.module';
import { PangeodataJHipsterPoliticallyExposedPersonsCheckReportModule } from './politically-exposed-persons-check-report/politically-exposed-persons-check-report.module';
import { PangeodataJHipsterReferenceCheckReportModule } from './reference-check-report/reference-check-report.module';
import { PangeodataJHipsterReportedCriminalActivityCheckModule } from './reported-criminal-activity-check/reported-criminal-activity-check.module';
import { PangeodataJHipsterSocialMediaCheckReportModule } from './social-media-check-report/social-media-check-report.module';
import { PangeodataJHipsterDefaultReportModule } from './default-report/default-report.module';
import { PangeodataJHipsterOffenceModule } from './offence/offence.module';
import { PangeodataJHipsterMigrationModule } from './migration/migration.module';
import { PangeodataJHipsterRequirementModule } from './requirement/requirement.module';
import { PangeodataJHipsterRuleModule } from './rule/rule.module';
import { PangeodataJHipsterTokenModule } from './token/token.module';
import { PangeodataJHipsterSessionModule } from './session/session.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        PangeodataJHipsterTransactionModule,
        PangeodataJHipsterGeneralInformationModule,
        PangeodataJHipsterAddressModule,
        PangeodataJHipsterCountryModule,
        PangeodataJHipsterOrderModule,
        PangeodataJHipsterCustomUserModule,
        PangeodataJHipsterCompanyModule,
        PangeodataJHipsterOrderFileModule,
        PangeodataJHipsterOrderInputModule,
        PangeodataJHipsterOrderFormModule,
        PangeodataJHipsterProductModule,
        PangeodataJHipsterIOrderReportModule,
        PangeodataJHipsterApplicationServiceModule,
        PangeodataJHipsterFileModule,
        PangeodataJHipsterLinkModule,
        PangeodataJHipsterICoverNameModule,
        PangeodataJHipsterIOrderFormModule,
        PangeodataJHipsterOrderEmploymentFormModule,
        PangeodataJHipsterOrderEducationFormModule,
        PangeodataJHipsterOrderProfessionalLicenseFormModule,
        PangeodataJHipsterProductCountryModule,
        PangeodataJHipsterCriminalRecordReportModule,
        PangeodataJHipsterEducationReportModule,
        PangeodataJHipsterEmploymentReportModule,
        PangeodataJHipsterAddressCheckReportModule,
        PangeodataJHipsterBankruptcyCheckReportModule,
        PangeodataJHipsterCivilLitigationCheckReportModule,
        PangeodataJHipsterCreditCheckReportModule,
        PangeodataJHipsterDirectorshipVerificationReportModule,
        PangeodataJHipsterDriversLicenseCheckReportModule,
        PangeodataJHipsterIdentityCheckReportModule,
        PangeodataJHipsterLicenseCheckReportModule,
        PangeodataJHipsterLocalLanguageMediaCheckReportModule,
        PangeodataJHipsterPassportCheckReportModule,
        PangeodataJHipsterPoliticallyExposedPersonsCheckReportModule,
        PangeodataJHipsterReferenceCheckReportModule,
        PangeodataJHipsterReportedCriminalActivityCheckModule,
        PangeodataJHipsterSocialMediaCheckReportModule,
        PangeodataJHipsterDefaultReportModule,
        PangeodataJHipsterOffenceModule,
        PangeodataJHipsterMigrationModule,
        PangeodataJHipsterRequirementModule,
        PangeodataJHipsterRuleModule,
        PangeodataJHipsterTokenModule,
        PangeodataJHipsterSessionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PangeodataJHipsterEntityModule {}
