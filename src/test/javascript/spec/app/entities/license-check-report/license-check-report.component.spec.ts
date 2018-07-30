/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { LicenseCheckReportComponent } from 'app/entities/license-check-report/license-check-report.component';
import { LicenseCheckReportService } from 'app/entities/license-check-report/license-check-report.service';
import { LicenseCheckReport } from 'app/shared/model/license-check-report.model';

describe('Component Tests', () => {
    describe('LicenseCheckReport Management Component', () => {
        let comp: LicenseCheckReportComponent;
        let fixture: ComponentFixture<LicenseCheckReportComponent>;
        let service: LicenseCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [LicenseCheckReportComponent],
                providers: []
            })
                .overrideTemplate(LicenseCheckReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LicenseCheckReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LicenseCheckReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LicenseCheckReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.licenseCheckReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
