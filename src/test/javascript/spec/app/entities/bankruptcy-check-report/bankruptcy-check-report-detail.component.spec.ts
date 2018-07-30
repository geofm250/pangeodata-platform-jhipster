/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { BankruptcyCheckReportDetailComponent } from 'app/entities/bankruptcy-check-report/bankruptcy-check-report-detail.component';
import { BankruptcyCheckReport } from 'app/shared/model/bankruptcy-check-report.model';

describe('Component Tests', () => {
    describe('BankruptcyCheckReport Management Detail Component', () => {
        let comp: BankruptcyCheckReportDetailComponent;
        let fixture: ComponentFixture<BankruptcyCheckReportDetailComponent>;
        const route = ({ data: of({ bankruptcyCheckReport: new BankruptcyCheckReport('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [BankruptcyCheckReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BankruptcyCheckReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BankruptcyCheckReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.bankruptcyCheckReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
