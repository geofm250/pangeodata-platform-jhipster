/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { CriminalRecordReportDetailComponent } from 'app/entities/criminal-record-report/criminal-record-report-detail.component';
import { CriminalRecordReport } from 'app/shared/model/criminal-record-report.model';

describe('Component Tests', () => {
    describe('CriminalRecordReport Management Detail Component', () => {
        let comp: CriminalRecordReportDetailComponent;
        let fixture: ComponentFixture<CriminalRecordReportDetailComponent>;
        const route = ({ data: of({ criminalRecordReport: new CriminalRecordReport('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [CriminalRecordReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CriminalRecordReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CriminalRecordReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.criminalRecordReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
