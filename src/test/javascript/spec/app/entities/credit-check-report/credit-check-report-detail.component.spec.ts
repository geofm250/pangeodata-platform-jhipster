/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { CreditCheckReportDetailComponent } from 'app/entities/credit-check-report/credit-check-report-detail.component';
import { CreditCheckReport } from 'app/shared/model/credit-check-report.model';

describe('Component Tests', () => {
    describe('CreditCheckReport Management Detail Component', () => {
        let comp: CreditCheckReportDetailComponent;
        let fixture: ComponentFixture<CreditCheckReportDetailComponent>;
        const route = ({ data: of({ creditCheckReport: new CreditCheckReport('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [CreditCheckReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CreditCheckReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CreditCheckReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.creditCheckReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
