/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { BankruptcyCheckReportComponent } from 'app/entities/bankruptcy-check-report/bankruptcy-check-report.component';
import { BankruptcyCheckReportService } from 'app/entities/bankruptcy-check-report/bankruptcy-check-report.service';
import { BankruptcyCheckReport } from 'app/shared/model/bankruptcy-check-report.model';

describe('Component Tests', () => {
    describe('BankruptcyCheckReport Management Component', () => {
        let comp: BankruptcyCheckReportComponent;
        let fixture: ComponentFixture<BankruptcyCheckReportComponent>;
        let service: BankruptcyCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [BankruptcyCheckReportComponent],
                providers: []
            })
                .overrideTemplate(BankruptcyCheckReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BankruptcyCheckReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankruptcyCheckReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BankruptcyCheckReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.bankruptcyCheckReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
