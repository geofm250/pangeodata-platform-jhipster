/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { PoliticallyExposedPersonsCheckReportComponent } from 'app/entities/politically-exposed-persons-check-report/politically-exposed-persons-check-report.component';
import { PoliticallyExposedPersonsCheckReportService } from 'app/entities/politically-exposed-persons-check-report/politically-exposed-persons-check-report.service';
import { PoliticallyExposedPersonsCheckReport } from 'app/shared/model/politically-exposed-persons-check-report.model';

describe('Component Tests', () => {
    describe('PoliticallyExposedPersonsCheckReport Management Component', () => {
        let comp: PoliticallyExposedPersonsCheckReportComponent;
        let fixture: ComponentFixture<PoliticallyExposedPersonsCheckReportComponent>;
        let service: PoliticallyExposedPersonsCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [PoliticallyExposedPersonsCheckReportComponent],
                providers: []
            })
                .overrideTemplate(PoliticallyExposedPersonsCheckReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PoliticallyExposedPersonsCheckReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PoliticallyExposedPersonsCheckReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PoliticallyExposedPersonsCheckReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.politicallyExposedPersonsCheckReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
