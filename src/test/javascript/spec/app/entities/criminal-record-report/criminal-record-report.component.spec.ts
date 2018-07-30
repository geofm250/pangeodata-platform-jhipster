/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { CriminalRecordReportComponent } from 'app/entities/criminal-record-report/criminal-record-report.component';
import { CriminalRecordReportService } from 'app/entities/criminal-record-report/criminal-record-report.service';
import { CriminalRecordReport } from 'app/shared/model/criminal-record-report.model';

describe('Component Tests', () => {
    describe('CriminalRecordReport Management Component', () => {
        let comp: CriminalRecordReportComponent;
        let fixture: ComponentFixture<CriminalRecordReportComponent>;
        let service: CriminalRecordReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [CriminalRecordReportComponent],
                providers: []
            })
                .overrideTemplate(CriminalRecordReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CriminalRecordReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CriminalRecordReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CriminalRecordReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.criminalRecordReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
