/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { DriversLicenseCheckReportDetailComponent } from 'app/entities/drivers-license-check-report/drivers-license-check-report-detail.component';
import { DriversLicenseCheckReport } from 'app/shared/model/drivers-license-check-report.model';

describe('Component Tests', () => {
    describe('DriversLicenseCheckReport Management Detail Component', () => {
        let comp: DriversLicenseCheckReportDetailComponent;
        let fixture: ComponentFixture<DriversLicenseCheckReportDetailComponent>;
        const route = ({ data: of({ driversLicenseCheckReport: new DriversLicenseCheckReport('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [DriversLicenseCheckReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DriversLicenseCheckReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DriversLicenseCheckReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.driversLicenseCheckReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
