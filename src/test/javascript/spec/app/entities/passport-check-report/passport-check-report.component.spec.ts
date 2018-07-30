/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { PassportCheckReportComponent } from 'app/entities/passport-check-report/passport-check-report.component';
import { PassportCheckReportService } from 'app/entities/passport-check-report/passport-check-report.service';
import { PassportCheckReport } from 'app/shared/model/passport-check-report.model';

describe('Component Tests', () => {
    describe('PassportCheckReport Management Component', () => {
        let comp: PassportCheckReportComponent;
        let fixture: ComponentFixture<PassportCheckReportComponent>;
        let service: PassportCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [PassportCheckReportComponent],
                providers: []
            })
                .overrideTemplate(PassportCheckReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PassportCheckReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PassportCheckReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PassportCheckReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.passportCheckReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
