/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { CreditCheckReportComponent } from 'app/entities/credit-check-report/credit-check-report.component';
import { CreditCheckReportService } from 'app/entities/credit-check-report/credit-check-report.service';
import { CreditCheckReport } from 'app/shared/model/credit-check-report.model';

describe('Component Tests', () => {
    describe('CreditCheckReport Management Component', () => {
        let comp: CreditCheckReportComponent;
        let fixture: ComponentFixture<CreditCheckReportComponent>;
        let service: CreditCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [CreditCheckReportComponent],
                providers: []
            })
                .overrideTemplate(CreditCheckReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CreditCheckReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CreditCheckReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CreditCheckReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.creditCheckReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
