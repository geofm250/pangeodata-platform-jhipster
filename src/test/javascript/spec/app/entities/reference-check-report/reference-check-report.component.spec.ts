/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ReferenceCheckReportComponent } from 'app/entities/reference-check-report/reference-check-report.component';
import { ReferenceCheckReportService } from 'app/entities/reference-check-report/reference-check-report.service';
import { ReferenceCheckReport } from 'app/shared/model/reference-check-report.model';

describe('Component Tests', () => {
    describe('ReferenceCheckReport Management Component', () => {
        let comp: ReferenceCheckReportComponent;
        let fixture: ComponentFixture<ReferenceCheckReportComponent>;
        let service: ReferenceCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ReferenceCheckReportComponent],
                providers: []
            })
                .overrideTemplate(ReferenceCheckReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReferenceCheckReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReferenceCheckReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ReferenceCheckReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.referenceCheckReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
