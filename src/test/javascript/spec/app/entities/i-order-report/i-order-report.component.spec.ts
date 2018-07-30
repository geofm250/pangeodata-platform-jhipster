/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { IOrderReportComponent } from 'app/entities/i-order-report/i-order-report.component';
import { IOrderReportService } from 'app/entities/i-order-report/i-order-report.service';
import { IOrderReport } from 'app/shared/model/i-order-report.model';

describe('Component Tests', () => {
    describe('IOrderReport Management Component', () => {
        let comp: IOrderReportComponent;
        let fixture: ComponentFixture<IOrderReportComponent>;
        let service: IOrderReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [IOrderReportComponent],
                providers: []
            })
                .overrideTemplate(IOrderReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IOrderReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IOrderReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new IOrderReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.iOrderReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
