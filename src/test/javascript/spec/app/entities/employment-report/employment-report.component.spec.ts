/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { EmploymentReportComponent } from 'app/entities/employment-report/employment-report.component';
import { EmploymentReportService } from 'app/entities/employment-report/employment-report.service';
import { EmploymentReport } from 'app/shared/model/employment-report.model';

describe('Component Tests', () => {
    describe('EmploymentReport Management Component', () => {
        let comp: EmploymentReportComponent;
        let fixture: ComponentFixture<EmploymentReportComponent>;
        let service: EmploymentReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [EmploymentReportComponent],
                providers: []
            })
                .overrideTemplate(EmploymentReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EmploymentReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmploymentReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EmploymentReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.employmentReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
