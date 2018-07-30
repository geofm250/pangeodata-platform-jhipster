/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { EmploymentReportDetailComponent } from 'app/entities/employment-report/employment-report-detail.component';
import { EmploymentReport } from 'app/shared/model/employment-report.model';

describe('Component Tests', () => {
    describe('EmploymentReport Management Detail Component', () => {
        let comp: EmploymentReportDetailComponent;
        let fixture: ComponentFixture<EmploymentReportDetailComponent>;
        const route = ({ data: of({ employmentReport: new EmploymentReport('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [EmploymentReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EmploymentReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmploymentReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.employmentReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
