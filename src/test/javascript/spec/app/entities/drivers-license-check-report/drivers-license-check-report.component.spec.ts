/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { DriversLicenseCheckReportComponent } from 'app/entities/drivers-license-check-report/drivers-license-check-report.component';
import { DriversLicenseCheckReportService } from 'app/entities/drivers-license-check-report/drivers-license-check-report.service';
import { DriversLicenseCheckReport } from 'app/shared/model/drivers-license-check-report.model';

describe('Component Tests', () => {
    describe('DriversLicenseCheckReport Management Component', () => {
        let comp: DriversLicenseCheckReportComponent;
        let fixture: ComponentFixture<DriversLicenseCheckReportComponent>;
        let service: DriversLicenseCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [DriversLicenseCheckReportComponent],
                providers: []
            })
                .overrideTemplate(DriversLicenseCheckReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DriversLicenseCheckReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DriversLicenseCheckReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DriversLicenseCheckReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.driversLicenseCheckReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
