/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { IOrderReportDetailComponent } from 'app/entities/i-order-report/i-order-report-detail.component';
import { IOrderReport } from 'app/shared/model/i-order-report.model';

describe('Component Tests', () => {
    describe('IOrderReport Management Detail Component', () => {
        let comp: IOrderReportDetailComponent;
        let fixture: ComponentFixture<IOrderReportDetailComponent>;
        const route = ({ data: of({ iOrderReport: new IOrderReport('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [IOrderReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IOrderReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IOrderReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.iOrderReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
