/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { EducationReportComponent } from 'app/entities/education-report/education-report.component';
import { EducationReportService } from 'app/entities/education-report/education-report.service';
import { EducationReport } from 'app/shared/model/education-report.model';

describe('Component Tests', () => {
    describe('EducationReport Management Component', () => {
        let comp: EducationReportComponent;
        let fixture: ComponentFixture<EducationReportComponent>;
        let service: EducationReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [EducationReportComponent],
                providers: []
            })
                .overrideTemplate(EducationReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EducationReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EducationReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.educationReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
