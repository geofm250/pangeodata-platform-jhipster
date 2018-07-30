/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { LicenseCheckReportDetailComponent } from 'app/entities/license-check-report/license-check-report-detail.component';
import { LicenseCheckReport } from 'app/shared/model/license-check-report.model';

describe('Component Tests', () => {
    describe('LicenseCheckReport Management Detail Component', () => {
        let comp: LicenseCheckReportDetailComponent;
        let fixture: ComponentFixture<LicenseCheckReportDetailComponent>;
        const route = ({ data: of({ licenseCheckReport: new LicenseCheckReport('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [LicenseCheckReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LicenseCheckReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LicenseCheckReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.licenseCheckReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
